import { Application, Request, Response } from "express";
import { OpenApi, Types, bodySchema } from "ts-openapi";
import { CustomerType, errorSchema, responseSchema, commonProperties } from "./common";

// this handles requests
function getCustomer(_request: Request, response: Response) {
  response.send({
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "customer name",
    type: CustomerType.Platinum,
    birthdate: "2021-02-04",
  });
}

export function initGetCustomer(app: Application, openApi: OpenApi) {
  // define route
  const route = "/customer/:id";
  // declare route to express
  app.get(route, getCustomer);

  // declare openAPI schema
  openApi.addPath(
    route,
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
}

function listCustomers(request: Request, response: Response) {
  const records = [];
  for (let i = 0; i < Number(request.query.records); i++) {
    records.push({
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "customer name",
      type: CustomerType.Platinum,
      birthdate: "2021-02-04",
    });
  }
  response.send({ data: records });
}

export function initListCustomers(app: Application, openApi: OpenApi) {
  // define route
  const route = "/customer/list";
  // declare route to express
  app.get(route, listCustomers);

  // declare openAPI schema
  openApi.addPath(
    route,
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
}

function create(request: Request, response: Response) {
  if (!request.headers.authorization) {
    response.status(401).send({
      message: "Unauthorized",
      code: 401,
    });
  } else {
    response.status(201).send({
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      ...request.body,
    });
  }
}

export function initPostCustomer(app: Application, openApi: OpenApi) {
  initCreate(app, openApi);
}

function initCreate(app: Application, openApi: OpenApi) {
  // define route
  const route = "/customer";
  // declare route to express
  app.post(route, create);

  // declare openAPI schema
  openApi.addPath(
    route,
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
}
