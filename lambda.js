const serverless = require("serverless-http");
const app = require("./src/app");
const connectDatabase = require("./src/config/db");

const serve = serverless(app);

module.exports.handler = async (event, context) => {
  await connectDatabase();
  return serve(event, context);
};
