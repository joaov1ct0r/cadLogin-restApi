import { Request } from "express";

interface IReq extends Request {
  userId?: string;
}

export default IReq;
