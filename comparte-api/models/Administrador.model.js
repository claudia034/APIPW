const Mongoose = require("mongoose");
const Schema = Mongoose.Schema; 

const AdministadorSchema = new Schema({
    duiAdmin: {
        type: String,
        //required: true,
        trim: true
    },
    correo: {
        type: String,
        //required: true,
        trim: true
    }
},{ timestamps: true });

module.exports = Mongoose.model("Administrador", AdministadorSchema);
