"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPostCustomer = exports.initListCustomers = exports.initGetCustomer = void 0;
const ts_openapi_1 = require("ts-openapi");
const common_1 = require("./common");
// this handles requests
function getCustomer(_request, response) {
    response.send({
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "customer name",
        type: common_1.CustomerType.Platinum,
        birthdate: "2021-02-04",
    });
}
function initGetCustomer(app, openApi) {
    // define route
    const route = "/customer/:id";
    // declare route to express
    app.get(route, getCustomer);
    // declare openAPI schema
    openApi.addPath(route, {
        get: {
            summary: "Get a customer data",
            description: "This operation retrieves customer information",
            operationId: "get-customer-op",
            requestSchema: {
                params: {
                    id: ts_openapi_1.Types.Uuid({
                        description: "Customer ID",
                        required: true,
                        example: "37237d6a-bb7e-459a-b75d-d1733210ad5c",
                    }),
                },
            },
            tags: ["Customer Operations"],
            responses: {
                200: ts_openapi_1.bodySchema(ts_openapi_1.Types.Object({
                    description: "Successful Operation",
                    properties: common_1.responseSchema,
                })),
                400: common_1.errorSchema("Bad Request"),
            },
        },
    }, true);
}
exports.initGetCustomer = initGetCustomer;
function listCustomers(request, response) {
    const records = [];
    for (let i = 0; i < Number(request.query.records); i++) {
        records.push({
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "customer name",
            type: common_1.CustomerType.Platinum,
            birthdate: "2021-02-04",
        });
    }
    response.send({ data: records });
}
function initListCustomers(app, openApi) {
    // define route
    const route = "/customer/list";
    // declare route to express
    app.get(route, listCustomers);
    // declare openAPI schema
    openApi.addPath(route, {
        get: {
            summary: "Get a page of customer data",
            description: "This operation return an array of customer information",
            operationId: "list-customer-op",
            requestSchema: {
                query: {
                    page: ts_openapi_1.Types.Integer({
                        description: "Page number",
                        default: 0,
                        minValue: 0,
                    }),
                    records: ts_openapi_1.Types.Integer({
                        description: "Records per page",
                        default: 10,
                        minValue: 10,
                        maxValue: 100,
                        required: true,
                    }),
                    types: ts_openapi_1.Types.Array({
                        arrayType: ts_openapi_1.Types.StringEnum({
                            values: Object.values(common_1.CustomerType),
                        }),
                    }),
                },
            },
            tags: ["Customer Operations"],
            responses: {
                200: ts_openapi_1.bodySchema(ts_openapi_1.Types.Object({
                    description: "Successful Operation",
                    properties: {
                        data: ts_openapi_1.Types.Array({
                            description: "An array of customers",
                            arrayType: ts_openapi_1.Types.Object({
                                description: "Customer detail",
                                properties: common_1.responseSchema,
                            }),
                        }),
                    },
                })),
                400: common_1.errorSchema("Bad Request"),
            },
        },
    }, true);
}
exports.initListCustomers = initListCustomers;
function create(request, response) {
    if (!request.headers.authorization) {
        response.status(401).send({
            message: "Unauthorized",
            code: 401,
        });
    }
    else {
        response.status(201).send(Object.assign({ id: "3fa85f64-5717-4562-b3fc-2c963f66afa6" }, request.body));
    }
}
function initPostCustomer(app, openApi) {
    initCreate(app, openApi);
}
exports.initPostCustomer = initPostCustomer;
function initCreate(app, openApi) {
    // define route
    const route = "/customer";
    // declare route to express
    app.post(route, create);
    openApi.declareSecurityScheme("bearerSecurity", ts_openapi_1.bearerAuth());
    // declare openAPI schema
    openApi.addPath(route, {
        post: {
            summary: "Create customer",
            description: "This operation creates a new customer",
            operationId: "post-customer-op",
            requestSchema: {
                headers: {
                    requestId: ts_openapi_1.Types.Uuid({
                        description: "Request ID",
                        required: false,
                        example: "b710e129-4e2c-4448-b605-73b18d297bae",
                    }),
                },
                body: ts_openapi_1.Types.Object({
                    description: "Customer data to create",
                    properties: common_1.commonProperties,
                }),
            },
            tags: ["Customer Operations"],
            security: [{ bearerSecurity: [] }],
            responses: {
                201: ts_openapi_1.bodySchema(ts_openapi_1.Types.Object({
                    description: "Created",
                    properties: Object.assign({ id: ts_openapi_1.Types.Uuid({ description: "Customer ID" }) }, common_1.commonProperties),
                    example: {
                        id: "b710e129-4e2c-4448-b605-73b18d297bae",
                        name: "Customer Name",
                        type: common_1.CustomerType.Platinum,
                        birthdate: "2020-12-30",
                    },
                })),
                400: common_1.errorSchema("Bad Request"),
                401: common_1.errorSchema("Unauthorized"),
            },
        },
    }, true);
}
