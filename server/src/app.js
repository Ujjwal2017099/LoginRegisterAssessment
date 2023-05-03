require('./connection/connection')
const User = require('./models/user')
const PORT = 8000;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const express = require('express')
const app = express();
require("dotenv").config();

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());


app.post('/signup',(req,res)=>{
    const user = new User({
        Name: req.body.name,
        Email: req.body.email,
        Password: req.body.password,
    });
    user.save()
        .then(() => {
            console.log("user saved");
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
})

app.get('/login',async (req,res)=>{
    let status = 400
    let token="";   
    try {
        const r = await User.find({Email : req.query.email,Password : req.query.password})
        
        if(r.length) {
            status = 200
            token = jwt.sign({
                Email: req.query.email,
                Password: req.query.password,
            },process.env.ACCESS_KEY);
        }
        
    } catch (error) {
        
        console.log(error);
    }
    res.status(status).json(token);
})

app.get('/profile',(req,res)=>{
    try {
        const token = req.query.token;
        
        jwt.verify(token, process.env.ACCESS_KEY, async (err, user) => {
            if (err) console.log(err);
            else {
                const r = await User.find({
                    Email: user.Email,
                    Password: user.Password,
                });

                if (r.length)
                    res.json({
                        Email: r[0].Email,
                        Name: r[0].Name,
                        Password : r[0].Password
                    });
            }
        });
    } catch (err) {
        console.log(err);
    }
})

app.post('/update',(req,res)=>{
    try {
        const token = req.query.token;
        jwt.verify(token, process.env.ACCESS_KEY, async (err,user) => {
            if (err) console.log(err);
            else {
                const r = await User.find({
                    Email: user.Email,
                    Password: user.Password,
                });
                
                if (r.length){
                    r[0].Name = req.body.name;
                    r[0].Password = req.body.password;

                    r[0].save()
                    .then(()=>{
                        res.sendStatus(201);
                    })
                    .catch(()=>{
                        res.sendStatus(400);
                    })
                }
                    
            }
        });
    } catch (err) {
        console.log(err);
    }
})

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})

