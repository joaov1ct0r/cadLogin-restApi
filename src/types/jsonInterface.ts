import { JwtPayload } from "jsonwebtoken";

interface IJwt extends JwtPayload {
  id: string;
  admin: boolean;
}

export default IJwt;
