const express = require("express");
const {
  getTickets,
  createTicket,
  getTicketDetail,
  updateTicket,
  deleteOneTicket,
} = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getTickets).post(protect, createTicket);

router
  .route("/:id")
  .get(protect, getTicketDetail)
  .put(protect, updateTicket)
  .delete(protect, deleteOneTicket);

module.exports = router;
