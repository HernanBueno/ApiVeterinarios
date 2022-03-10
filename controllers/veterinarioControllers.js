import Veterinario from '../models/Veterinario.js'
import generarJWT from '../helpers/generarJWT.js';
import generarID from '../helpers/generarId.js';


const registrar = async(req, res) => {
    const { email } = req.body
        //prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({ email })
    if (existeUsuario) {
        const error = new Error('usuario ya registrado')
        return res.status(400).json({ msg: error.message })
    }

    try {
        //guardar nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save()
        res.json(veterinarioGuardado)
    } catch (error) {
        console.log(error)
    }

};


const confirmar = async(req, res) => {
    const { token } = req.params

    const usuarioConfirmar = await Veterinario.findOne({ token })
    if (!usuarioConfirmar) {
        const error = new Error('token no valido')
        return res.status(404).json({ msg: error.message })
    }
    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save()
        res.json({ msg: 'Usuario confirmado correctamente' });

    } catch (error) {
        console.log(error)
    }
}


const perfil = (req, res) => {
    const { veterinario } = req;
    res.json({ perfil: veterinario });
}


const olvidePassword = async(req, res) => {
    const { email } = req.body;
    const existeVeterinario = await Veterinario.findOne(email);
    if (!existeVeterinario) {
        const error = new Error('Usuario no existe')
        return res.status(400).json({ msg: error.message })
    }
    try {
        existeVeterinario.token = generarID()
        await existeVeterinario.save()
        res.json({ msg: 'Hemos enviado un email con instrucciones' })
    } catch (error) {
        console.log(error)
    }
}


const comprobarToken = async(req, res) => {
    const { token } = req.params;
    const tokenValido = await Veterinario.findOne({ token });
    if (tokenValido) {
        res.json({ msg: 'token valido y el usuario existe' })
    } else {
        const error = new Error('token no valido')
        return res.status(400).json({ msg: error.message })
    }
}


const nuevoPassword = async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const veterinario = await Veterinario.findOne({ token })
    if (!veterinario) {
        const error = new Error('hubo un error')
        return res.status(400).json({ msg: error.message })
    }
    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({ msg: 'password cambiado exitosamente' })
    } catch (error) {
        console.log(error)
    }
}


const autenticar = async(req, res) => {
    const { email, password } = req.body;
    //compruebo si existe usuario
    const usuario = await Veterinario.findOne({ email })
    if (!usuario) {
        const error = new Error('usuario no existe')
        return res.status(404).json({ msg: error.message })
    }

    //comprouebo si el usuario esta confirmado o no
    if (!usuario.confirmado) {
        const error = new Error('Cuenta no confirmada')
        return res.status(403).json({ msg: error.message })
    }


    //reviso pass
    if (await usuario.comprobarPassword(password)) {
        //autenticar a usuario
        res.json({ token: generarJWT(usuario.id) })

    } else {
        const error = new Error('passwor incorrecto')
        return res.status(403).json({ msg: error.message })
    }
}


export { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword };