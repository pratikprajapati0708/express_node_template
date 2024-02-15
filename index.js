const express = require("express")
const app = express();
app.use(express.json())
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017");

const User = mongoose.model('Users',{
    email : String,
    password : String,
    name :String
})

app.post('/signup',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const existinguser = await user.findOne({email : email});
    if(existinguser){
        return res.status(400).send("Username already exists");
    }
    const user = new User({
        email : email,
        password : password,
        name : name
    });
    user.save();
    res.json({
        message : "User created successfully"
    })
})


app.listen(3001)