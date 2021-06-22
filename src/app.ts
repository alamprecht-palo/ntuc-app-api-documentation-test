import express, { Application } from "express";

import { initOpenApi, openApiInstance } from "./domains/common/openapi";

import { helloWorldRouter } from "./domains/hello_world/hello_world_routes";
import { customerRouter } from "./domains/customer/customer_routes";

const PORT = 8000;

// Create a new express app instance
const app: Application = express();
// add support for parsing json
app.use(express.json());

// register the API routes
app.use("/", helloWorldRouter);
app.use("/customer", customerRouter);

// initializes schema endpoint and swagger UI
initOpenApi(app, openApiInstance);

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}!`);
});
