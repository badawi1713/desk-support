const { text } = require("express");
const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

const getNotes = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;
  const { id: userId } = req.user;
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  const ticket = await Ticket.findById(ticketId);

  if (ticket.user.toString() !== userId) {
    res.status(401);
    throw new Error("User is unauthorized!");
  }

  const notes = await Note.find({ ticket: ticketId });

  res.status(200).send({
    object: {
      notes: notes,
    },
  });
});

const createNotes = asyncHandler(async (req, res) => {
    const { ticketId } = req.params;
    const { id: userId } = req.user;
    const {text, isStaff} = req.body
    const user = await User.findById(userId);
  
    if (!user) {
      res.status(404);
      throw new Error("User Not Found");
    }
  
    const ticket = await Ticket.findById(ticketId);
  
    console.log(ticketId);
  
    if (ticket.user.toString() !== userId) {
      res.status(401);
      throw new Error("User is unauthorized!");
    }
  
    const notes = await Note.create({
        text: text,
        isStaff: isStaff || false,
        ticket: ticketId,
        user: userId
    });
  
    res.status(200).send({
      object: {
        notes: notes,
      },
    });
  });

module.exports = {
    getNotes,
    createNotes
};
