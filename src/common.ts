import { bodySchema, Types } from "ts-openapi";

export enum CustomerType {
  Platinum = "platinum",
  Gold = "gold",
  Silver = "silver",
}

export function errorSchema(description: string) {
  return bodySchema(
    Types.Object({
      description,
      properties: {
        message: Types.String({ description: "Error message" }),
        code: Types.Integer({ description: "Error code" }),
      },
    })
  );
}

export const commonProperties = {
  name: Types.String({
    description: "Customer name",
    maxLength: 100,
    required: true,
  }),
  type: Types.StringEnum({
    values: Object.values(CustomerType),
    description: "Customer Type",
  }),
  birthdate: Types.Date({ description: "Birthdate" }),
};

export const responseSchema = { ...{ id: Types.Uuid({ description: "Customer ID" }) }, ...commonProperties };
