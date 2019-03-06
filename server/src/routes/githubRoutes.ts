import { Router } from 'express';
import * as githubController from '../controllers/githubController';

const router: Router = Router();

router.get('/', githubController.fetchService);
router.delete('/', githubController.removeProvider);
export default router;
