import { Router } from 'express';
import * as projectController from '../controllers/projectController';

const router: Router = Router();

router.post('/', projectController.createProject);
router.get('/upload/image', projectController.getS3Link);

export default router;
