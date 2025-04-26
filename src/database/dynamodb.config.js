// Import necessary commands from the AWS SDK for DynamoDB
import { DynamoDBClient, DescribeEndpointsCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb";

import logErrorsDetails from "../utils/logErrorsDetails.js";

// Get the current environment (development or production)
const NodeEnv = process.env.NODE_ENV;

// Initialize the DynamoDB client configuration with the AWS region
const clientConfig = { region: process.env.AWS_REGION };

// In development mode, override endpoint and credentials to use local DynamoDB
if (NodeEnv === "development") {
  clientConfig.endpoint = process.env.DYNAMODB_LOCAL_ENDPOINT;
  clientConfig.credentials = {
    accessKeyId: process.env.DYNAMODB_LOCAL_ACCESS_KEY_ID,
    secretAccessKey: process.env.DYNAMODB_LOCAL_SECRET_ACCESS_KEY,
  };
}

// Instance of the DynamoDB client
const dynamoDBClient = new DynamoDBClient(clientConfig);

/**
 * Establishes a connection with DynamoDB based on the environment.
 * In production, it connects to AWS DynamoDB.
 * In development, it connects to the local DynamoDB instance.
 *
 * @returns {Promise<boolean>} - Returns true if the connection is successful, false otherwise.
 */
const establishDBConnection = async () => {
  try {
    console.info(`\nEnvironment Mode : ${NodeEnv}`);

    if (NodeEnv === "production") {
      // Step 1. Establishing DynamoDB Connection

      const describeEndpoints = new DescribeEndpointsCommand({});
      const dynamoDBConnection = await dynamoDBClient.send(describeEndpoints);
      console.log(`\nEstablishing DynamoDB Connection\n`, dynamoDBConnection);

      const dynamoDBTables = await dynamoDBClient.send(new ListTablesCommand({}));
      const tableNames = dynamoDBTables.TableNames;

      if (tableNames === undefined) {
        console.error("Unexpected response : 'TableNames' Property Missing.");
      } else if (tableNames === null) {
        console.error("Unexpected response : 'TableNames' is null.");
      } else if (tableNames.length === 0) {
        console.log("\nExisting AWS Tables :\n", dynamoDBTables, "\nNo Existing Tables were found in the database.");
        console.info("\nDynamoDB connection established successfully.");
      } else {
        console.log("\nExisting AWS Tables :\n", dynamoDBTables);
        console.info("\nDynamoDB connection established successfully.");
      }

      return true;
    } else {
      // In development, only list tables from the local instance

      const dynamoDBTablesLocal = await dynamoDBClient.send(new ListTablesCommand({}));
      const tableNames = dynamoDBTablesLocal.TableNames;

      console.log(`\nEstablishing DynamoDBConnection Locally :\n`, clientConfig);

      if (tableNames === undefined) {
        console.error("Unexpected response : 'TableNames' Property Missing.");
      } else if (tableNames === null) {
        console.error("Unexpected response : 'TableNames' is null.");
      } else if (tableNames.length === 0) {
        console.log("\nExisting Local Tables :\n", dynamoDBTablesLocal, "No Existing Tables were found in the database.");
        console.info("\nDynamoDB connection established successfully.");
      } else {
        console.log("\nExisting Local Tables :\n", dynamoDBTablesLocal);
        console.info("\nDynamoDB connection established successfully.");
      }

      return true;
    }
  } catch (error) {
    // Log error details and return false if connection fails
    logErrorsDetails("DynamoDB Connection Error", error);
    return false;
  }
};
export default establishDBConnection;
