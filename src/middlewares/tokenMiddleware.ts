import { Request, Response, NextFunction } from "express";
import { AppType } from "../utils/constants/enums/AppType";

export const getCookieName = (appType) =>
    ({
        [AppType.VALUER]: 'AUTH_TOKEN_COOKIE',
        [AppType.LENDER]: 'AUTH_TOKEN_COOKIE_LENDER',
    }[appType] || 'AUTH_TOKEN_COOKIE_ADMIN');

export async function tokenHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // if (req.get("x-source") === String(process.env.ACCESS_TOKEN)) {
    //   return next();
    // }
    return next();
  } catch (error: any) {
    return res.status(403).json({
      responseCode: "000028",
      responseMessage: error.message,
      status: "Fail",
    });
  }
}

export default tokenHandler;
