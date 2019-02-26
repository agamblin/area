import { Router } from 'express';
import * as githubController from '../controllers/githubController';

const router: Router = Router();

router.get('/', githubController.getInfoAboutService);
router.delete('/', githubController.removeProvider);
export default router;
