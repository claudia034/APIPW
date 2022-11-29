import router from "../app";
import admin from "../models/Administrador.model.js";
const debug = require("debug")("app:post-controller");

const controller = {};

controller.create = async (req, res) => {
    try{
    const {duiUsuario, fechaCita, horaCita, confirmacion, lugar } = req.body;

   const admin = new admin({
    duiUsuario: duiUsuario,
    fechaCita: fechaCita,
    horaCita: horaCita,
    confirmacion: confirmacion,
    lugar: lugar
   });

   const newAdmin = await cita.save();

   if(!newAdmin){
    return res.status(409).json({ error: "Ha ocurrido un error al crear la cita"});
   }

   return res.status(201).json(newAdmin);
    }catch(error){
        debug( {error} )
        return res.status(500).json({ error: "Error interno de servidor"})}

} //creación de usuarios


export default controller; 