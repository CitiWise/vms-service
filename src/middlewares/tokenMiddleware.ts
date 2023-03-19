import { Request, Response, NextFunction } from "express";

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
