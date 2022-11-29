const Express = require("express");
const router = Express.Router();

const authController = require("../../controllers/auth.controller");
const runValidations = require("../../validators/index.middleware");
const { registerValidator } = require("../../validators/auth.validators");
const { authentication } = require("../../middlewares/auth.middewares");

router.post("/signup",
  registerValidator,
  runValidations,
  authController.register
);

router.post("/signin", 
  authController.login);

router.post("/signinGoogle", 
  authController.loginGoogle);

router.get("/whoami", authentication, authController.whoami);

router.post("/addDateToUser", authController.addDateToUser);

router.post("/updateUser", authController.updateUser);

router.get("/getAllUsers", authController.findAllUsers);

router.post("/findByUsername", authController.findByUsername);

router.post("/updatePuntaje", authController.updatePuntaje);

module.exports = router;