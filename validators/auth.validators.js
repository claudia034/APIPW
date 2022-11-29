const { body } = require("express-validator");

const validators = {};
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/

validators.registerValidator = [
  body("dui")
    .notEmpty()
    .withMessage("DUI is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("DUI must be 10 characters long"),

  body("username")
    .notEmpty().withMessage("El username no puede ir vacío")
    .isLength({ min: 4, max: 32 }).withMessage("El username debe tener entre 4 y 32 caracteres"),

  body("email")
    .notEmpty().withMessage("El correo no debe de ir vacío")
    .isEmail().withMessage("Debes respetar el formato del correo"),

  body("password")
    .notEmpty().withMessage("La contraseña no puede ir vacía")
    .matches(passwordRegexp).withMessage("La contraseña debe de tener entre 8 y 32 chars, y al menos 1 M, 1 m y 1 #"),
    
  body("bloodType")
    .notEmpty().withMessage("El tipo de sangre no puede ir vacío")
    .isLength({ min: 1, max: 4 }).withMessage("El tipo de sangre debe tener entre 3 y 4 caracteres"),

  body("gender")
    .notEmpty().withMessage("El género no puede ir vacío")
    .isLength({ min: 4, max: 10 }).withMessage("El género debe tener entre 4 y 10 caracteres"),

  body("dateBirth")
    .notEmpty().withMessage("La fecha de nacimiento no puede ir vacía")
    .isDate({format: 'YYYY-MM-DD'}).withMessage("La fecha de nacimiento debe ser una fecha válida"),

  body("phone")
    .notEmpty().withMessage("El teléfono no puede ir vacío")
    .isLength({ min: 8, max: 9 }).withMessage("El teléfono debe tener entre 8 y 9 caracteres")
   
]

module.exports = validators;