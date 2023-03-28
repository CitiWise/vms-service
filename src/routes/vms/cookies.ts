import { Router, IRouter } from "express";
import { clearCookie, cookieResponse } from "../../controllers/vms/cookies";
const router: IRouter = Router();
/**
 * Route to clear the cookie
 */

router.delete("/", clearCookie);

/**x
 *  Route to Obtain Cookie if available
 */

router.get("/", cookieResponse);

export default router;
