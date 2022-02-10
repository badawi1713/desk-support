const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const connectDB = require("./config/db");
const cors = require("cors");

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());

// Set body parse middleware
app.use(express.json());

// encoded form
app.use(express.urlencoded({ extended: false }));

app.get("/service/api/v1/public/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the support API!",
  });
});

app.use("/service/api/v1/users", userRoutes);
app.use("/service/api/v1/tickets", ticketRoutes);

app.use(errorHandler);

// connectDB
connectDB();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
