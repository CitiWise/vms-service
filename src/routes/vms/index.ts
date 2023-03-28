// oms service routes
import { Router, IRouter } from "express";
import cookieRoutes from "./cookies";
const router: IRouter = Router();


router.use("/cookie", cookieRoutes);

export default router;
