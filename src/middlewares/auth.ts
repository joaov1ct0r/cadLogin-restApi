import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.header("auth-token");

  if (!token) return res.status(401).send("Acesso negado");

  try {
    const userVerified = jwt.verify(token, process.env.NODE_ENV_TOKEN_SECRET);

    if (!userVerified) return res.status(401).send("Acesso negado");
    next();
  } catch (error) {
    throw error;
  }
}
