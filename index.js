const express = require('express')
require('./connection/db')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const UsersModel = require('./model/user')
const app = express()


app.use(express.json())

//        Upload Image etc..
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./upload")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")

        }
    })
}).single("user_file")
app.post('/upload', upload, (req, res) => {
    res.send('file upload')
    console.log(req.file) //get path name and store database
})


//     Login 
app.post('/login', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await UsersModel.findOne({ email: email })
        const ismatch = await bcrypt.compare(password, user.params)

        if (ismatch) {
            res.send('login successfully')
        } else {
            res.send('Plz Try again ......')
        }
    } catch (error) {
        res.send('Plz Enter Vaild information')
    }

})

//         check  register users....
app.get('/', async (req, res) => {
    const result = await UsersModel.find()
    res.send(result)
})

//              Signup....
app.post('/createUser', async (req, res) => {
    let data = new UsersModel(req.body)
    const user = await UsersModel.findOne({email:data.email})
    if(!user){
        let result = await data.save()
        res.send(result)
    }else{
        res.send('Email already exit..')
    }

})

//Delete user of database
app.delete('/delete/:_id', async (req, res) => {
    let data = await UsersModel.deleteOne(req.params)
    res.send(data)
})




app.listen(5000, () => {
    console.log('Server connected')
})