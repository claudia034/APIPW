const { body, param } = require("express-validator");
const validators = {};

validators.addDateValidator = [
    body("duiUsuario")
    .notEmpty()
    .withMessage("DUI is required")
    .isLength({ min: 10, max: 10 }),

    body("fechaCita")
    .notEmpty()
    .isISO8601,

    body("confirmacion")
    .notEmpty(),
    
    body("lugar")
    .notEmpty()
    .isLength({ max: 75})
    .withMessage("El lugar no debe superar los 75 caracteres"),
];

validators.addUserToDateValidator = [
    body("dui")
    .notEmpty()
    .withMessage("DUI is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("DUI must be 9 characters long")
]

/*validators.findPostByDUIValidator = [
    param("identifier")
    .notEmpty().withMessage("El dui no debe ir vacío")
    //.isMongoId().withMessage("El id debe ser de mongo") --Preguntar este
]*/

module.exports = validators;