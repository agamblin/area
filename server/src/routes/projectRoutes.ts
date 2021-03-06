import { Router } from 'express';
import { body } from 'express-validator/check';
import * as projectController from '../controllers/projectController';
import validateReq from '../middlewares/validateReq';

const router: Router = Router();

router.post(
	'/',
	[
		body('name')
			.isLength({ min: 3 })
			.withMessage('Name must be at least 3 characters'),
		body('description')
			.isLength({ min: 20 })
			.withMessage('Description must be at least 20 characters')
	],
	validateReq,
	projectController.createProject
);

router.get('/', projectController.getProjects);
router.get('/:projectId', projectController.getProject);

router.post('/:projectId/triggers/githubPr', projectController.githubPrTrigger);
router.post(
	'/:projectId/triggers/githubIssues',
	projectController.githubIssuesTrigger
);
router.post(
	'/:projectId/triggers/trelloPr',
	projectController.trelloCardsPrTrigger
);
router.post(
	'/:projectId/triggers/trelloIssues',
	projectController.trelloCardsIssueTrigger
);

router.get('/upload/image', projectController.getS3Link);

export default router;
