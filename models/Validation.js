const Joi = require('joi')
const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError = new Error("Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length")

const authSchema = Joi.object({
    username: Joi.string().lowercase().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().regex(strongPasswordRegex).required(),
    firstName: Joi.string().uppercase().required(),
    lastName: Joi.string().uppercase().required(),
    age: Joi.number().max(120),
    gender: Joi.string().length(1)
}).options({allowUnknown: true})

module.exports = authSchema;