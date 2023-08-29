
const User =require("../models/user")
const  generateToken = require("./generateToken")
const registerUser = async(req,res) =>{

    const {name ,email,password ,pic}= req.body;
    
if(!name || !email || !password)
{
   res.status(400);
   throw new Error(" please fill all fields") 
}
const userexist = await User.findOne({email});
if(userexist)
{
    res.status(400).json({
      message: "user already exist",
    });
    
}

const user = await User.create({
    name,
    email,
    password,
    pic,
});

if(user){
    res.status(201).json({
      success: true,
      user,
      token: generateToken(user._id),
      message: "user registered",
    });
    }
    else{
        res.status(400);
          throw new Error("failed to create");

    }
}

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      user,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
        message:"invalid email or password"
    });
    
  }
};

const allusers = async (req,res)=>{
  const keyword = req.query.search
  
  ? {
      $or :[
              {name:{$regex : req.query.search ,$options :"i"}},
              {email:{$regex : req.query.search ,$options :"i"}}
    
           ], 
    } 
    :{};

    const user = await User.find(keyword).find({_id:{ $ne:req.user._id}}) 
    res.send(user)


}

module.exports =  { registerUser ,authUser , allusers};