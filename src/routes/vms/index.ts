// oms service routes
import { Router, IRouter } from "express";
import cookieRoutes from "./cookies";
import valuationRoutes from "./valuation";
const router: IRouter = Router();


router.use("/cookie", cookieRoutes);

router.use("/valuation", valuationRoutes);

export default router;
