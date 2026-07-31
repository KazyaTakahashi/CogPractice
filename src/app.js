const express = require("express");
const cors = require("cors");
const customerRoutes = require("./routes/customerRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDatabase = require("./config/db");

const app = express();

connectDatabase().catch((error) => {
	console.error("MongoDB connection error:", error);
});

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
	res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);

module.exports = app;