const path = require("path");
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

app.use("/service/api/v1/users", userRoutes);
app.use("/service/api/v1/tickets", ticketRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to the support desk API!'
    })
  })
}

app.use(errorHandler);

// connectDB
connectDB();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
