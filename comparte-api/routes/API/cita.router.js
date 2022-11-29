const Express = require("express");
const router = Express.Router();

const runValidations = require("../../validators/index.middleware");
const { addDateValidator, addUserToDateValidator } = require("../../validators/cita.validators");
const { authentication } = require("../../middlewares/auth.middewares");
const datesController = require("../../controllers/cita.controller");

/* router.get("/own", authentication, datesController.findOwn); */
/* router.get("/user/:identifier",
    dateValidator,
    runValidations,
    datesController.findByDUI);*/

// RUTA PARA CREAR CITAS

router.post("/createDate", datesController.create);

// RUTA PARA OBTENER TODAS LAS CITAS

router.get("/getDates", datesController.findAll);

// RUTA PARA BUSCAR LAS CITAS DE UN USUARIO

router.post("/getUserDates", datesController.getUserDates);

// RUTA PARA AGREGAR USUARIO A UNA CITA

router.post("/addUserToDate", 
            addUserToDateValidator, 
            runValidations,
            datesController.addUserToDate);

// FUNCION PARA ACTUALIZAR LOS CUPOS DE UNA CITA

router.post("/updateOcupados", 
            datesController.upadteOcupados);   

// FUNCION PARA BUSCAR LAS CITAS ENTRE UN RANGO DE FECHAS

router.post("/findByDates", 
            datesController.findByDate);

module.exports = router;
