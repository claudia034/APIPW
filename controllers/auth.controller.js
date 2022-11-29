const User = require("../models/User.model");
const Cita = require("../models/Cita.model.js");
const debug = require("debug")("app:auth-controller");
const ROLES = require("../data/roles.constant.json");

const { createToken, verifyToken } = require('../utils/jwt.tools');

const controller = {};

// REGISTRAR UN USUARIO

controller.register = async (req, res) => {
  try {
    //Paso 01: Obtener los datos del usuario -> Req -> body
    const { dui, username, email, password, bloodType, gender, dateBirth, phone ,emergencyName,emergencyPhone} = req.body;

    //Paso 02: Verificar que el username o el email estén libres
    const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

    if (user) {
      return res.status(409).json({ error: "Este usuario ya existe" });
    }

    debug({ username, email, password })
    //Paso 03: Encriptar? No puedo guardar una contraseña tal cual
    //Paso 04: Guardar mi usuario

    const newUser = new User({
      dui: dui,
      username: username,
      email: email,
      password: password,
      bloodType: bloodType,
      gender: gender,
      dateBirth: dateBirth,
      phone: phone,
      emergencyName: emergencyName,
      emergencyPhone: emergencyPhone,
      roles: [ROLES.USER],
      SavedDates: [],
      puntaje: 0
    });

    await newUser.save();

    return res.status(201).json({ message: "Usuario creado con éxito!" })
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error inesperado" })
  }
}

// LOGUEAR UN USUARIO

controller.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    //Paso 01: Verificar si el usuario existe
    const user = await User.findOne({ $or: [{ dui: identifier }, { email: identifier }] });

    if (!user) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    //Paso 02: Comparar las contraseñas
    if (!user.comparePassword(password)) {
      return res.status(401).json({ error: "Contraseña no coincide" });
    }

    //Paso 03: Loggearlo
    const token = createToken(user._id);
    user.tokens = [token, ...user.tokens.filter(_token => verifyToken(_token)).splice(0, 4)];

    await user.save();

    //Paso 04: Registrar los tokens de usuario

    return res.status(200).json({ token: token });
  } catch (error) {
    debug(error);
    return res.status(500).json({ error: "Error inesperado" })
  }
}

controller.loginGoogle = async (req, res) => {
  try {
    const { identifier } = req.body;

    //Paso 01: Verificar si el usuario existe
    const user = await User.findOne({  email: identifier });

    if (!user) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    //Paso 03: Loggearlo
    const token = createToken(user._id);
    user.tokens = [token, ...user.tokens.filter(_token => verifyToken(_token)).splice(0, 4)];

    await user.save();

    //Paso 04: Registrar los tokens de usuario

    return res.status(200).json({ token: token });
  } catch (error) {
    debug(error);
    return res.status(500).json({ error: "Error inesperado" })
  }
}


// FUNCION PARA OBTENER LOS DATOS DEL USUARIO 


controller.whoami = async (req, res) => {
  try {
    const { _id, username, dui, email, roles, bloodType, gender, dateBirth,phone, emergencyName, emergencyPhone, puntaje, SavedDates } = req.user;
    return res.status(200).json({ _id, dui, username, email, roles, bloodType, gender, dateBirth,phone, emergencyName, emergencyPhone, puntaje, SavedDates });
  } catch (error) {
    debug(error);
    return res.status(500).json({ error: "Error inesperado" })
  }
}

// FUNCION PARA AGREGAR DATES AL USUARIO 

controller.addDateToUser = async (req, res) => {
  try {
    const {identifier, dateId } = req.body;

    const user = await User.findOne({dui: identifier});

    const dates = await Cita.findOne({_id : dateId});

    if (!user) {
      return res.status(404).json({ error: "El usuario no existe" });
    }
    if (!dates) {
      return res.status(404).json({ error: "La fecha no existe" });
    }

    user.SavedDates = [dates._id,...user.SavedDates]

    await user.save();
    
    return res.status(200).json({ message: "Cita agregada con éxito!" });
  } catch (error) {
    debug(error);
    return res.status(500).json({ error: "Error inesperado" })
  }
}


// FUNCION PARA ACTUALIZAR CAMPOS DEL USUARIO 

controller.updateUser = async (req, res) => {
  try{
    const { dui, emergencyName, emergencyPhone, phone } = req.body;
  
    const user = await User.findOne({dui : dui})

    if (!user){
      return res.status(404).json({ error: "El usuario no existe" });
    }

    await User.findOneAndUpdate({dui : dui}, {emergencyName: emergencyName, emergencyPhone: emergencyPhone, phone:phone}, {new :true} )
    
    return res.status(201).json({ 
      ok : true,
      message: "Usuario actualizado con exito!" });
  } 
  catch (error) {
    debug(error);
    return res.status(500).json({ error: "Error inesperado" })
  }

}

// FUNCION PARA OBTENER TODOS LOS USUARIOS

controller.findAllUsers = async (req, res) => {
  try {
      const users = await User.find({ hidden: false })
      
      return res.status(200).json({ users });
  } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Error interno de servidor" });
  }
}


// CONSULTAR CITAS EN UN PERIODO DE FECHAS

controller.findByUsername = async (req, res) => {
  try {
      const { username } = req.body;

      const user = await User.find({ username: username })
    
      if (user == "") {
          return res.status(404).json({ error: "No se encontro ninguna usuario con este nombre" });
      }
      else
        return res.status(200).json({ user });
  }
  catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Error interno de servidor" });
  }
}

controller.updatePuntaje = async (req, res) => {
  try {
      const { userId } = req.body;

      // BUSCAR LA CITA CON EL ID

      const user = await User.findOne({ _id: userId })

      if (!user) {
          return res.status(404).json({ error: "No se encontro ningun usuario" });
      }   

      user.puntaje = user.puntaje + 10;

      await user.save();

      return res.status(200).json({ message: "Cita actualizada" });
  }
  catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Error interno de servidor" });
  }
}


  
module.exports = controller;