import { Request, Response, NextFunction, CookieOptions } from "express";
import { verifyOauthCode, verifyToken } from "../utils/authenticate";
import { AppType } from "../utils/constants/enums/AppType";
import { logger } from "../utils/logger";

export const getCookieName = (appType) =>
  ({
    [AppType.VALUER]: "AUTH_TOKEN_COOKIE",
    [AppType.LENDER]: "AUTH_TOKEN_COOKIE_LENDER",
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
    if (req.get("x-source") === String(process.env.INGRESS_TOKEN)) {
      req[`user`] = { id: req.get("x-company-id") };
      return next();
    }

    if (req.path === "/vms/cookie" && req.method === "DELETE") {
      return next();
    }

    // making cookieName for different panel and getting cookie(Token) from different panel so cookie name will be different
    // So no cookie(Token) will be re initialized or re assigned
    const cookieName = getCookieName(req.headers.apptype);
    const token = req.signedCookies[getCookieName(req.headers.apptype)];

    if (token) {
      const entityId = await verifyToken(token, req.headers.apptype);
      logger.info(`!!!!!!!!!!!!entityId!!!!!!! ${JSON.stringify(entityId)}`);

      /**
       * checking if entityId's userType is not matching with current userType
       * This userType only check once when user is logged in and call set cookie route to just set oms cookie
       * If it does not match then generate token once again set oms cookie (First Case)
       * If it is matched then just need to pass data (Second Case)
       */

      if (!entityId) {
        throw new Error("Token is invalid , Logout user");
      }

      if (req.query?.userType === entityId?.userType || entityId) {
        // First Case
        req[`user`] = { id: entityId.id, userType: entityId.userType };
        return next();
      } else {
        // Second Case

        const authToken = await verifyOauthCode(String(req.query.oauthCode), req.headers.apptype);

        if (!authToken) {
          throw new Error("oauth not valid , Logout user");
        } else {
          res.cookie(cookieName, authToken.token, defaultCookieOptions);
          req[`user`] = {
            id: authToken.entityId,
            userType: authToken.userType,
          };
          return next();
        }
      }
    } else if (req.query?.oauthCode) {
      const authToken = await verifyOauthCode(String(req.query.oauthCode), req.headers.apptype);

      if (!authToken) {
        throw new Error(`oauth not valid , Logout user`);
      } else {
        res.cookie(cookieName, authToken.token, defaultCookieOptions);
        req[`user`] = { id: authToken.entityId, userType: authToken.userType };
        return next();
      }
    } else {
      throw new Error(`No Token Present or Auth code , Logout user`);
    }
  } catch (error: any) {
    return res.status(403).json({
      responseCode: "000028",
      responseMessage: error.message,
      status: "Fail",
    });
  }
}

export default tokenHandler;
