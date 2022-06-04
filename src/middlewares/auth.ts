import jwt from "jsonwebtoken";

import IJwt from "../types/jsonInterface";

export default function (req, res, next) {
  const token = req.cookies.authentication.split(" ")[1];

  if (token.length === 0) {
    return res.status(400).json({ error: "Token não encontrado!" });
  }

  try {
    const verifiedToken: IJwt = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET as string
    ) as IJwt;

    if (!verifiedToken) {
      return res.status(401).json({ error: "Falha na autenticação!" });
    }
    req.userId = verifiedToken.id;

    next();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
}
