import { Request, Response, NextFunction, CookieOptions } from "express";
import { verifyOauthCode, verifyToken } from "../utils/authenticate";
import { AppType } from "../utils/constants/enums/AppType";
import { logger } from "../utils/logger";

export const getCookieName = (appType) =>
  ({
    [AppType.VALUER]: "SESSION_COOKIE_VALUER",
    [AppType.LENDER]: "SESSION_COOKIE_LENDER",
  }[appType] || "AUTH_TOKEN_COOKIE_ADMIN");

const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  signed: true,
  secure: true,
  sameSite: "none",
};

export async function tokenHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
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
