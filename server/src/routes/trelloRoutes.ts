import { Router } from 'express';
import * as trelloController from '../controllers/trelloController';

const router: Router = Router();

router.post('/', trelloController.registerTrelloService);
router.get('/', trelloController.fetchTrelloService);
router.delete('/', trelloController.resetTrelloService);

router.get('/boards/:boardId', trelloController.fetchBoard);
router.get('/boards/:boardId/cards', trelloController.fetchCards);

router.get('/cards/:cardId', trelloController.fetchCard);

export default router;
