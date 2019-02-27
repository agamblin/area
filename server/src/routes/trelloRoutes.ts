import { Router } from 'express';
import * as trelloController from '../controllers/trelloController';

const router: Router = Router();

router.post('/', trelloController.registerTrelloService);
router.get('/', trelloController.fetchTrelloService);
router.delete('/', trelloController.resetTrelloService);
export default router;
