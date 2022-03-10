import mongoose from "mongoose";

const pacientesSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
    },
    propietario: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    fecha: {
        type: Date,
        trim: true,
    },
    sintomas: {
        type: String,
        trim: true,
    },
    veterinario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario'
    }
}, { timestamps: true });

const Paciente = mongoose.model('Paciente', pacientesSchema);
export default Paciente;