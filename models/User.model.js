const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const debug = require("debug")("app:user-model");

const crypto = require("crypto");

const userSchema = new Schema({
  dui: {
    type: String,
    unique: true,
    trim: true,
    minlength: 10,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  bloodType: {
    type: String,
    //required: true,
    trim: true,
  },
  gender: {
    type: String,
    //required: true,
    trim: true,
  },
  dateBirth: {
    type: String,
    //required: true,
    trim: true,
  },
  phone: {
    type: String,
    //required: true,
    trim: true,
  },
  emergencyName: {
    type: String,
    trim: true,
  },
  emergencyPhone: {
    type: String,
    trim: true,
  },
  salt: {
    type: String
  },
  tokens: {
    type: [String],
    default: []
  },
  roles: {
    type: [String],
    default: []
  },
  //Falta Save dates
  SavedDates: {
    type:[String],
    default: []
  },
  puntaje: {
    type: Number,
    min: 0
  }
}, { timestamps: true });

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";

    try {
      const encryptedPassword = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000, 64,
        `sha512`
      ).toString("hex");

      return encryptedPassword;
    } catch (error) {
      debug({ error });
      return "";
    }
  },
  makeSalt: function () {
    return crypto.randomBytes(16).toString("hex");
  },
  comparePassword: function (password) {
    return this.hashedPassword === this.encryptPassword(password);
  }
}

userSchema.virtual("password")
  .set(function (password = crypto.randomBytes(16).toString()) {
    if (!password) return;

    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })

module.exports = Mongoose.model("User", userSchema);