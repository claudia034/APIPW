const Cita = require("../models/Cita.model.js");
const debug = require("debug")("app:cita-controller");

const controller = {};

controller.create = async (req, res) => {
    try {
        const { duiUsuario, fechaCita, horaCita, cupos, ocupados, confirmacion, lugar } = req.body;

        const cita = new Cita({
            duiUsuario: duiUsuario,
            fechaCita: fechaCita,
            horaCita: horaCita,
            cupos: cupos,
            ocupados: ocupados,
            confirmacion: confirmacion,
            lugar: lugar
        });

        const newCita = await cita.save();

        if (!newCita) {
            return res.status(409).json({ error: "Ha ocurrido un error al crear la cita" });
        }

        return res.status(201).json(newCita);
    } catch (error) {
        debug({ error })
        return res.status(500).json({ error: "Error interno de servidor" })
    }

}

// FUNCION PARA OBTENER TODAS LAS CITAS

controller.findAll = async (req, res) => {
    try {
        const dates = await Cita.find({ hidden: false })

        return res.status(200).json({ dates });
    } catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

// BUSCANDO LAS CITAS DE UN USUARIO

controller.getUserDates = async (req, res) => {
    try {
        const { identifier } = req.body;

        const citas = await Cita.find({ duiUsuario: { $elemMatch : {$in :identifier} }});

        if (!citas) {
            return res.status(404).json({ error: "El usuario no tiene citas" });
        }
        return res.status(200).json({ citas });
    } catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

// AGREGAR USUARIOS A CITAS

controller.addUserToDate = async (req, res) => {
    try {
        const { dui, dateIdentifire } = req.body;

        const date = await Cita.findOne({ _id: dateIdentifire })

        if (!date) {
            return res.status(404).json({ error: "Esta cita no existe" });
        }

        // Agregar dui de usuario al arreglo de las citas

        date.duiUsuario = [...date.duiUsuario, dui];

        //Paso 04: Guardar los cambios
        await date.save();

        return res.status(200).json({ message: "Usuario agregado" });
    }
    catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}


// ACTUALIZAR CITAS 

controller.upadteOcupados = async (req, res) => {
    try {
        const { dateid } = req.body;

        // BUSCAR LA CITA CON EL ID

        const date = await Cita.findOne({ _id: dateid })

        if (!date) {
            return res.status(404).json({ error: "Esta cita no existe" });
        }   

        date.ocupados = date.ocupados + 1;

        await date.save();

        return res.status(200).json({ message: "Cita actualizada" });
    }
    catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

// FUNCION PARA ACTUALIZAR LAS CITAS

controller.update = async (req, res) => {
    try {
        const { _id } = req.params;
        const { duiUsuario, fechaCita, horaCita, confirmacion, lugar } = req.body;

        const cita = await Cita.findOne
            ({ _id: _id });

        if (!cita) {
            return res.status(404).json({ error: "Esta cita no existe" });
        }

        cita.duiUsuario = duiUsuario;
        cita.fechaCita = fechaCita;
        cita.horaCita = horaCita;
        cita.confirmacion = confirmacion;
        cita.lugar = lugar;

        await cita.save();

        return res.status(200).json({ message: "Cita actualizada" });
    } catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}


// CONSULTAR CITAS EN UN PERIODO DE FECHAS

controller.findByDate = async (req, res) => {
    try {
        const { desde, hasta } = req.body;

        debug({ desde, hasta });

        const dates = await Cita.find({ fechaCita: { $gte: desde, $lte: hasta } });

        debug({ dates });

        if (!dates) {
            return res.status(404).json({ error: "No hay citas en este periodo" });
        }

        return res.status(200).json({ dates });
    }
    catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}


controller.findByDUI = async (req, res) => {
    try {
        const { identifier } = req.params;

        const cita = await Cita.findOne({ _id: identifier });

        if (!cita) {
            return res.status(404).json({ error: "Cita no encontrada" });
        }
        return res.status(200).json(cita);
    } catch (error) {
        debug({ error })
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

module.exports = controller;

