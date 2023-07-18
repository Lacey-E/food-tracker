const mongoose = require('mongoose')

const googleUserSchema = mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type:String,
        required: true
    },
    firstName: {
        type:String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    image: {
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const googleUser = mongoose.model('google-user', googleUserSchema)
module.exports = googleUser;