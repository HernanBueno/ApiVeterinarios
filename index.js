import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'



const app = express();
app.use(express.json())
dotenv.config();

conectarDB();


app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;
//server corriendo
app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});