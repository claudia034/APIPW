const {body, param} = require("express-validator");
const validators = {};

validators.createAdminValidator = [
    body("duiAdmin")
    .notEmpty()
    .withMessage("DUI is required")
    .isLength({ min: 9, max: 9 })
    .withMessage("DUI must be 9 characters long"),

    body("correo")
    .notEmpty().withMessage("El correo no debe de ir vacío")
    .isEmail().withMessage("Debes respetar el formato del correo"),

];

validators.findPostByDUIValidator = [
    param("identifier")
    .notEmpty().withMessage("El dui no debe ir vacío")
    //.isMongoId().withMessage("El id debe ser de mongo") --Preguntar este
]
module.exports = validators; 