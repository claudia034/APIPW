const express = require("express");
const router = express.Router();

//importar todos los enrutadores

const authRouter = require("./auth.router");
const datesRouter = require("./cita.router");

//Definir las rutas
router.use("/auth", authRouter);
router.use("/date", datesRouter);
//router.use("/post", postRouter);

module.exports = router;