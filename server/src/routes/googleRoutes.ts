import { Router } from 'express';
import * as googleController from '../controllers/googleController';

const router: Router = Router();

router.post('/', googleController.registerService);
router.get('/', googleController.fetchService);
router.delete('/', googleController.resetService);

router.get('/files', googleController.fetchFiles);
router.get('/files/:fileId', googleController.fetchFile);

router.get('/folders/:folderId', googleController.fetchFolder);

router.post('/upload/file', googleController.uploadGoogleFile);
export default router;
