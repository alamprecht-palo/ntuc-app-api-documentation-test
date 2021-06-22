import { Request, Response } from "express";
import { CustomerType } from "../common/common";

export const getCustomer = (_request: Request, response: Response) => {
  response.send({
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "customer name",
    type: CustomerType.Platinum,
    birthdate: "2021-02-04",
  });
};

export const listCustomers = (request: Request, response: Response) => {
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
};

export const createCustomer = (request: Request, response: Response) => {
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
};
