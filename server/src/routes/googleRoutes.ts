import { Router } from 'express';
import * as googleController from '../controllers/googleController';

const router: Router = Router();

router.post('/', googleController.registerProvider);
router.get('/files', googleController.fetchFiles);
export default router;
