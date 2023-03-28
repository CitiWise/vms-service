import { Request, Response } from "express";
import { getCookieName } from "../../../middlewares";
import { logger } from "../../../utils/logger";

export const clearCookie = async (request: Request, response: Response) => {
  const cookieName = getCookieName(request.headers.apptype);
  logger.info(
    `!!!!!!!cookieName and userType!!!!!! ${request.headers.apptype} and ${cookieName}`
  );

  response.clearCookie(cookieName, {
    httpOnly: true,
    signed: true,
    secure: true,
    sameSite: "none",
  });

  response.json({ status: true });
};

/**
 * Send Cookie Response
 */
export const cookieResponse = async (_request: Request, response: Response) => {
  response.json({ status: true });
};
