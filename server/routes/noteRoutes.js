const express = require("express");
const { getNotes, createNotes } = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router({ mergeParams: true });

router.route("/").get(protect, getNotes).post(protect, createNotes);

module.exports = router;
