const mongoose = require('mongoose')
const githubUserSchema = mongoose.Schema({
    githubId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    displayName: {
        type: String
    },
    photo: {
        type: String
    },
    provider: {
        type: String,
        required: true
    },
    profileUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const githubUser = mongoose.model('github-user', githubUserSchema)
module.exports = githubUser;