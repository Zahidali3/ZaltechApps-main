const { default: mongoose } = require('mongoose')
const db = require('../connection/db')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    content: String,
    password: String,
    school: String,
    softSkills: Array,
    hardSkills: Array,
    qualifications: Array,
    educationalSkills: Array,

})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
        console.log('bcry password', this.password)

    }
    next()

})

module.exports = mongoose.model('users', userSchema)

