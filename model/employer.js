const { default: mongoose } = require('mongoose')
const db = require('../connection/db')
const bcrypt = require('bcryptjs')

//field of table 
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    content: String,
    image:String,
    password: String,
    jobPost: Object,
})
// convert password to hash 
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
        console.log('bcry password', this.password)

    }
    next()

})
//create table of Employer
module.exports = mongoose.model('employer', userSchema)

