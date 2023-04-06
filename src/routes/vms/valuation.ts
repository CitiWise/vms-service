import { Router, IRouter } from "express";
import { ValuationController } from "../../controllers/vms/valuation";
const router: IRouter = Router();

/**
 * Route to create a valuation request
 */

router.post("/initialize", ValuationController.createValuationRequest);

/**
 *  Route to get valuations 
 */

router.post("/find", ValuationController.getValuationRequest);

export default router;
