const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");

const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { page = 0, limit = 5 } = req.query;

  if (!user) {
    res.status(401);
    throw new Error("user not found!");
  }
  const count = await Ticket.countDocuments();
  const ticket = await Ticket.find({ user: req.user.id })
    .limit(parseInt(limit))
    .skip(page * limit)
    .sort('-status');

  res.status(200).json({
    object: {
      tickets: ticket,
    },
    total: count,
    message: "Success to get all tickets",
  });
});

const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }

  const user = User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User is not found!");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json({
    message: "Created a new ticket",
    object: {
      ticket,
    },
  });
});

const getTicketDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const ticket = await Ticket.findById(id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!");
  }

  if (ticket.user.toString() !== userId) {
    res.status(403);
    throw new Error("Unauthorized user!");
  }

  res.status(200).json({
    message: "Ticket detail",
    object: {
      ticket,
    },
  });
});

const updateTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const ticket = await Ticket.findById(id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!");
  }

  if (ticket.user.toString() !== userId) {
    res.status(403);
    throw new Error("Unauthorized user!");
  }

  let docTicket = await Ticket.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "Ticket is updated",
    object: {
      ticket: docTicket,
    },
  });
});

const deleteOneTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const ticket = await Ticket.findById(id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!");
  }

  if (ticket.user.toString() !== userId) {
    res.status(403);
    throw new Error("Unauthorized user!");
  }

  await ticket.remove();

  res.status(200).json({
    message: "Your ticket is deleted",
  });
});

module.exports = {
  getTickets,
  createTicket,
  getTicketDetail,
  deleteOneTicket,
  updateTicket,
};
