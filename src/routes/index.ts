import { Router } from 'express';
import * as loginController from '../controllers/logarController';
import * as dataController from '../controllers/npagoController';

const router = Router();
router.get('/', loginController.home);
router.post('/login', loginController.login);
router.get('/naopago', dataController.npago);
router.get('/pago', dataController.pago);
router.get('/cadastrar', dataController.cadastrar);
router.get('/editar', dataController.editar);
router.get('/dados', dataController.dados);
router.get('/gerarpdf', dataController.gerar);

export default router;