import { Router } from 'express';
import * as googleController from '../controllers/googleController';

const router: Router = Router();

router.post('/', googleController.registerService);
router.get('/', googleController.fetchService);
router.delete('/', googleController.resetService);
router.get('/files', googleController.fetchFiles);
export default router;
