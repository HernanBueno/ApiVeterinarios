import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';
const checkAuth = async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.header.authorization.startsWith('Bearer')) {
        console.log('si tiene el token con bearer')

        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");
            return next()
        } catch (error) {
            const e = new Error('token no valido');
            return res.status(403).json({ msg: e.message });
        }
    }
    if (!token) {
        const error = new Error('token no valido o inexistente');
        res.status(403).json({ msg: error.message });
    }


    next();
}


export default checkAuth