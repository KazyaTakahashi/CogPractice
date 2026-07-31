const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../atlas-credentials.env") });

const mongoUri = process.env.MONGODB_URI || "mongodb+srv://<db_username>:<db_password>@cognixia.3nnb1qc.mongodb.net/?appName=Cognixia";

let hasConnected = false;

async function connectDatabase() {
  if (hasConnected) {
    return mongoose.connection;
  }

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGODB_DB_NAME || "BankApp"
  });

  hasConnected = true;
  console.log("MongoDB connected");
  return mongoose.connection;
}

module.exports = connectDatabase;
