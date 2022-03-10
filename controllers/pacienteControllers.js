import Paciente from "../models/Paciente.js"



//cuando se crea un nuevo cliente
const agregarPaciente = async(req, res) => {
    // crear obj de paciente con dato de req.body
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try {
        const pacienteGuardado = await paciente.save();

        res.json(pacienteGuardado);
    } catch (error) {
        console.log(error);
    }

    res.json({ mensaje: "el cliente se agrego correctamente" });
};
const obtenerPacientes = async(req, res) => {
    const pacientes = await Paciente.find()
        .where('veterinario')
        .equals(req.veterinario)
    res.json(pacientes);
};

//obtiene paciente por id
const obtenerPaciente = async(req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);
    if (!paciente) {
        res.status(404).json({ msg: 'no encontrado' })
    }
    if (paciente.veterinario._id.toString() !== req.veterinario.Paciente._id.toString()) {
        return res.json({ msg: 'accion no valida' })
    }

    res.json(paciente)


};

//actualiza paciente
const actualizaPaciente = async(req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);
    if (!paciente) {
        res.status(404).json({ msg: 'no encontrado' })
    }
    if (paciente.veterinario._id.toString() !== req.veterinario.Paciente._id.toString()) {
        return res.json({ msg: 'accion no valida' })
    }
    //actualizo
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;
    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado)
    } catch (error) {
        console.log(error)
    }
};

//elimina paciente4
const eliminarPaciente = async(req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);
    if (!paciente) {
        res.status(404).json({ msg: 'no encontrado' })
    }
    if (paciente.veterinario._id.toString() !== req.veterinario.Paciente._id.toString()) {
        return res.json({ msg: 'accion no valida' })
    }
    try {
        await paciente.deleteOne();
        res.json({ msg: "el paciente fue eliminado con exito" });
    } catch (error) {
        console.log(error);

    }
};

export { agregarPaciente, obtenerPacientes, eliminarPaciente, actualizaPaciente, obtenerPaciente };