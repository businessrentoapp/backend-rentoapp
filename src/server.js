import express from "express";

// Import utility to log error details
import logErrorsDetails from "./utils/logErrorsDetails.js";

// Import database connection and table verification functions
import establishDBConnection from "./database/dynamodb.config.js";

// Import route handlers
import homePageRouter from "./routes/home.routes.js";
import authRoutes from "./routes/auth.routes.js";

const server = express();

server.use(express.json());

server.use("/", homePageRouter);

// Define the route for authentication-related APIs
server.use("/api/v1/auth", authRoutes);

// Middleware to handle 404 errors for undefined routes
server.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error-handling middleware to catch and respond to server errors
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error Global Handler" });
});

const startServer = async () => {
  try {
    // Establish a connection to the database
    const isDBConnected = await establishDBConnection();
    if (!isDBConnected) {
      console.error("\nDatabase Connection Failed! Server not started.");
      process.exit(1); // Exit the process if the database connection fails
    }

    const port = process.env.PORT || 7000;

    // Start the server and listen on the specified port
    server.listen(port, () => {
      console.info(`\nServer is start running at http://127.0.0.1:${port}`);
    });
  } catch (err) {
    logErrorsDetails("\nServer Startup Failure\n", err);
    console.info("\nShutting down system\n");
    process.exit(1); // Exit the process with an error code
  }
};
export default startServer;
