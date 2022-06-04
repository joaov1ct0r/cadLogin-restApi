import { JwtPayload } from "jsonwebtoken";

interface IJwt extends JwtPayload {
  id: string;
}

export default IJwt;
