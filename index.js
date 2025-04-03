import express from "express";

const server = express();
const port = process.env.PORT || 3000;

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Welcome to Livora Tech Solutions Pvt Ltd.");
});

// Handle undefined routes (404 handler)
server.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

server.listen(port, () => {
  console.log(`\nServer is running at http://localhost:${port}`);
});
