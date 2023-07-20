//jshint esversion:6
const express= require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const User= require("./Models/User")
dotenv.config();
const encrypt = require("mongoose-encryption")
const md5=require("md5")
app.use(express.static("public"))
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({
    extended:true
}));



mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
);

app.get("/",function(req,res)
{
    res.render("home")
})


app.get("/login",function(req,res)
{
    res.render("login")
})

app.get("/register",function(req,res)
{
    res.render("register")
})

app.post("/register",function(req,res)
{
   const newUser = User({
    email:req.body.email,
    password:md5(req.body.password)
   })
//    console.log(newUser)
// res.render("secrets")
try{   
newUser.save()
res.render("secrets")
}
catch
{

}
   
})
app.post("/login", async function(req, res) {
  try {
    const foundUser = await User.findOne({ email: req.body.email });

    if (foundUser) {
      if (foundUser.password === md5(req.body.password)) {
        res.render("secrets");
      } else {
        console.log("Password does not match");
      }
    } else {
      console.log("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

// app.post("/login",function(req,res)
// {
//     try
//     {
//      const foundUser = User.find({email : req.body.email})
     
//             if(foundUser)
//             {
//                 if(foundUser.password === req.body.password)
//                 {
//                     res.render("secrets")
//                 }
//             }
//             else
//             {
//                 console.log("sss")
//             }
        
     
//     }catch(err)
//     {
//             console.log(err)
//     }
// })



app.listen(3000,function(){
    console.log("Server Chal gya")
})