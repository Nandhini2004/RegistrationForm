const express = require('express');
const bodyParser = require('bodyParser');
const mongoose = require('mongoose');

const app=express();
const PORT=process.env.PORT||3000;

//MongoDB connection
mongoose.connect('mongodb://localhost/nandhiniramakrishnan03',{useNewUrlParser:true,useUnifiedTopology:true});

//Define a user schema
const userSchema=new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

//Create a user model
const User=mongoose.model('User',userSchema);

//Middleware
app.use(bodyParser.urlencoded({extended: true}));

//Serve static files(like styles.css)
app.use(express.static('public'));

//route for serving the registration form
app.get('/',(req,res)=>{res.sendFile(__dirname +'/index.html')});

//route for handling form submission
app.post('/register',(reg,res)=>{
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
    });
    newUser.save((err)=>{
        if(err){
            console.error(err);
            res.send('Error registering user.');
        }else{
            res.send('User reegistered successful.');
        }
    });
});

//start the server
app.listen(PORT,()=>{
    console.log('Server is running on http://localhost:${PORT}');
});