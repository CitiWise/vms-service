import vmsRoutersV1 from './vms/index';
import { Router } from 'express';


const router = Router();

router.use('/vms', vmsRoutersV1);
export default router;