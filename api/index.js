const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("../swagger");
const serverless = require("serverless-http"); // ✅ added

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use("/api/users", require("../routes/userRoutes"));
app.use("/api/tasks", require("../routes/taskRoutes"));

// Root route
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Server Error" });
});

// ✅ export as serverless function (IMPORTANT)
module.exports = serverless(app);