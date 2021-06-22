import { Router } from "express";
import { textPlain } from "ts-openapi";

import { openApiInstance } from "../common/openapi";
import { rootIndex } from "./hello_world_controller";

export const helloWorldRouter = Router();

helloWorldRouter.get("/", rootIndex);

openApiInstance.addPath(
  "/", // this is API path
  {
    // API method
    get: {
      description: "Hello world", // Method description
      summary: "Demo get request to show how to declare APIs", // Method summary
      operationId: "get-hello-op", // an unique operation id
      responses: {
        // here we declare the response types
        200: textPlain("Successful Operation"),
      },
      tags: ["Hello World"], // these tags group your methods in UI
    },
  },
  true // make method visible
);
