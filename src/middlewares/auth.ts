import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.cookies.authentication.split(" ")[1];

  if (token.length === 0) {
    return res.status(400).json({ error: "Token não encontrado!" });
  }

  try {
    const userVerified = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET as string
    );

    if (!userVerified) return res.status(401).send("Acesso negado");
    next();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
}
