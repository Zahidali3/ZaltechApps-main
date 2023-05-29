const express = require('express')
require('../connection/db')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const employerModel = require('../model/employer')
const router = express.Router()


router.use(express.json())

//        Upload Image local stroage file like  employerupold load you can check it upload file.
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "employerUpload")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")

        }
    })
}).single("employer_file")
router.post('/upload', upload, (req, res) => {
    var imgaePath=req.file.path
    res.send('file upload')
    console.log(imgaePath) //get path name and store database
})


//     Login of Employee
router.post('/login', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await employerModel.findOne({ email: email })
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

//              Signup....Employee
router.post('/createEmp',upload, async (req, res) => {
    let data = new employerModel(req.body)
    const user = await employerModel.findOne({email:data.email})
    if(!user){
        let result = await data.save()
        res.send(result)
    }else{
        res.send('Email already exit..')
    }

})

//if you want delete employe ------ localhost:5000/employer/delete/id
router.delete('/delete/:_id', async (req, res) => {
    let data = await employerModel.deleteOne(req.params)
    res.send(data)
})


//update data api
router.post('/update', async (req, res) => {
    // let data = await employerModel.updateMany({qualifications :['bss','sdf']})

    let data = await employerModel.updateMany({jobPost:{
        hardskills : ["Computer software knowledge.", "Graphic design", "Data analysis"],
        softskills: ["communication", "teamwork", "initiative"]
    }} )

    res.send('update')


})

//register employee list api
router.get('/list', async(req,res)=>{
    let data = await employerModel.find()
    res.send(data)
    console.log(data)
})



module.exports= router








