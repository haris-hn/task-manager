const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");

const userRoutes = require("../routes/userRoutes");
const taskRoutes = require("../routes/taskRoutes");

// Connect DB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is working");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Server Error" });
});

module.exports = app;