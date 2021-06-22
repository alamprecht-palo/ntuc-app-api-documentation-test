import { Request, Response } from "express";

export const rootIndex = (_request: Request, response: Response) => {
  response.send("Hello World!");
};
