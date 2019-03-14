import { Router } from 'express';
import * as githubController from '../controllers/githubController';

const router: Router = Router();

router.get('/', githubController.fetchService);
router.delete('/', githubController.removeProvider);

router.get('/pullrequests/:pullRequestId', githubController.mergeRequest);

router.get('/repos/:repoId', githubController.fetchRepo);
export default router;
