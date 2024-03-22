import { NextFunction, Request, Response } from "express";
import { findUserById, verifyToken } from "../service/user/user";
import expressAsyncHandler from "express-async-handler";

interface IOptions {
  requireLogin?: boolean;
}

function verifyAuth({ requireLogin }: IOptions = { requireLogin: true }) {
  return expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const bearer = req.get("Authorization") || req.cookies["Authorization"];

      if (typeof bearer !== "string") {
        if (requireLogin) {
          res.status(403).json({ msg: "Forbidden" });
        }else {
          next();
        }
        return;
      }

      const token = bearer.substring("Bearer ".length);

      try {
        const decoded = await verifyToken(token);
        const user = await findUserById(BigInt(decoded.id));
        if (user?.email != decoded.email) {
          if (requireLogin) {
            res.status(404).json({ msg: "User not found" });
          }else {
            next();
          }
          return;
        }
        req.context = user;
        next();
        return;
      } catch (err) {
        console.log(err);
      }

      if (requireLogin) {
        res.status(403).json({ msg: "Forbidden" });
      }else {
        next();
      }
    }
  );
}

export default verifyAuth;
