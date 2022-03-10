import express from "express";
import { agregarPaciente, obtenerPacientes, obtenerPaciente, actualizaPaciente, eliminarPaciente } from "../controllers/pacienteControllers.js"
import checkAuth from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/')
    //agregar nuevos pacientes via Posts
    .post(checkAuth, agregarPaciente)
    //obtiene registros de pacientes en bd
    .get(checkAuth, obtenerPacientes);
router.route('/:id')
    //obtiene paciente en especifico
    .get(checkAuth, obtenerPaciente)
    //actualizar dato de algun paciente
    .put(checkAuth, actualizaPaciente)
    //elimina registro
    .delete(checkAuth, eliminarPaciente);

export default router;