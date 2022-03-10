import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import { perfil, registrar, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/veterinarioControllers.js'
const router = express.Router();
//publico
router.post('/', registrar)
router.get('/confirmar/:token', confirmar)
router.post('/login', autenticar)
router.post('/olvide-password', olvidePassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)
    //privado
router.get('/perfil', checkAuth, perfil)
export default router;