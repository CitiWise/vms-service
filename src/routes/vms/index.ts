// oms service routes
import { Router, IRouter } from 'express';

const router: IRouter = Router();

router.get('/', (req,res)=>{return res.status('200', 'Hello') });

export default router;
