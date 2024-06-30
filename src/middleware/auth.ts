import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken extends jwt.JwtPayload {
  id: string;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    // const user = (req as any).user;
    // user.id = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;
