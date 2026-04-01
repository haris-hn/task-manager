
const express = require("express");
const cors = require("cors");

const userRoutes = require("../routes/userRoutes");
const taskRoutes = require("../routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API is working");
});

module.exports = app;
