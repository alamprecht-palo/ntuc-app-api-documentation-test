import { Router } from "express";
import { Types, bodySchema, bearerAuth } from "ts-openapi";

import { CustomerType, errorSchema, responseSchema, commonProperties } from "../common/common";

import { openApiInstance } from "../common/openapi";
import { getCustomer, listCustomers, createCustomer } from "./customer_controller";

export const customerRouter = Router();

const baseRoute = "/customer/";
// getCustomer endpoint
customerRouter.get("/:id", getCustomer);
openApiInstance.addPath(
  baseRoute + ":id",
  {
    get: {
      summary: "Get a customer data",
      description: "This operation retrieves customer information",
      operationId: "get-customer-op",
      requestSchema: {
        params: {
          id: Types.Uuid({
            description: "Customer ID",
            required: true, // param values MUST be required
            example: "37237d6a-bb7e-459a-b75d-d1733210ad5c",
          }),
        },
      },
      tags: ["Customer Operations"],
      responses: {
        200: bodySchema(
          Types.Object({
            description: "Successful Operation",
            properties: responseSchema,
          })
        ),
        400: errorSchema("Bad Request"),
      },
    },
  },
  true
);

// listCustomers endpoint
customerRouter.get("/list", listCustomers);
openApiInstance.addPath(
  baseRoute + "list",
  {
    get: {
      summary: "Get a page of customer data",
      description: "This operation return an array of customer information",
      operationId: "list-customer-op",
      requestSchema: {
        query: {
          page: Types.Integer({
            description: "Page number",
            default: 0,
            minValue: 0,
          }),
          records: Types.Integer({
            description: "Records per page",
            default: 10,
            minValue: 10,
            maxValue: 100,
            required: true,
          }),
          types: Types.Array({
            arrayType: Types.StringEnum({
              values: Object.values(CustomerType),
            }),
          }),
        },
      },
      tags: ["Customer Operations"],
      responses: {
        200: bodySchema(
          Types.Object({
            description: "Successful Operation",
            properties: {
              data: Types.Array({
                description: "An array of customers",
                arrayType: Types.Object({
                  description: "Customer detail",
                  properties: responseSchema,
                }),
              }),
            },
          })
        ),
        400: errorSchema("Bad Request"),
      },
    },
  },
  true
);

// create Customer endpoint
customerRouter.post("/", createCustomer);

// declare openAPI schema
openApiInstance.declareSecurityScheme("bearerSecurity", bearerAuth());
openApiInstance.addPath(
  baseRoute,
  {
    post: {
      summary: "Create customer",
      description: "This operation creates a new customer",
      operationId: "post-customer-op",
      requestSchema: {
        headers: {
          requestId: Types.Uuid({
            description: "Request ID",
            required: false,
            example: "b710e129-4e2c-4448-b605-73b18d297bae",
          }),
        },
        body: Types.Object({
          description: "Customer data to create",
          properties: commonProperties,
        }),
      },
      tags: ["Customer Operations"],
      security: [{ bearerSecurity: [] }],
      responses: {
        201: bodySchema(
          Types.Object({
            description: "Created",
            properties: {
              id: Types.Uuid({ description: "Customer ID" }),
              ...commonProperties,
            },
            example: {
              id: "b710e129-4e2c-4448-b605-73b18d297bae",
              name: "Customer Name",
              type: CustomerType.Platinum,
              birthdate: "2020-12-30",
            },
          })
        ),
        400: errorSchema("Bad Request"),
        401: errorSchema("Unauthorized"),
      },
    },
  },
  true
);
