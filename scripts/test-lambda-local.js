const { handler } = require("../lambda");

async function run() {
  const response = await handler({
    version: "2.0",
    routeKey: "$default",
    rawPath: "/api/auth/me",
    requestContext: {
      http: {
        method: "GET",
        path: "/api/auth/me"
      }
    },
    headers: {}
  });

  console.log(response);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
