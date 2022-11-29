const Mongoose = require("mongoose");
const Schema = Mongoose.Schema; 

const CitaSchema = new Schema({
    duiUsuario: {
        type: [String],
        default: []
    },
    fechaCita: {
        type: Date,
        //required: true,
        trim: true
    },
    horaCita: {
        type: String,
        default: "00:00"
    },
    cupos: {
        type: Number,
        default: 20
    },
    ocupados: {
        type: Number,
        default: 0
    },
    confirmacion: {
        type: Boolean,
        //default: true,
        trim: true
    },
    lugar: {
        type: String,
        //required: true,
        trim: true
    }
},{ timestamps: true });

module.exports = Mongoose.model("Cita", CitaSchema);
