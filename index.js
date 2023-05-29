const express = require('express')
const app = express()

const  emp=require('./router/emyolerRoute')
const user=require('./router/userRoute')


app.use(express.json())

//Employer all router in this file
app.use('/employer',emp)

//user all router in this file 
app.use('/user',user)
//if access router on postman -- localhost:5000/user/userList and so on ......



//server port localhost/5000
app.listen(5000, () => {
    console.log('Server connected')
})