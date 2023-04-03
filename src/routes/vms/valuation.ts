import { Router, IRouter } from "express";
import { ValuationController } from "../../controllers/vms/valuation";
const router: IRouter = Router();

/**
 * Route to create a valuation request
 */

router.post("/initialize", ValuationController.createValuationRequest);

/**
 *  Route to Obtain Cookie if available
 */

router.get("/", ValuationController.getValuationRequest);

export default router;
