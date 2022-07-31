import { Request } from "express";

interface IReq extends Request {
  userId?: string;
  admin?: boolean;
}

export default IReq;
