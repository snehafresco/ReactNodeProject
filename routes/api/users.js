
const express = require("express");
const router = express.Router();
const { check, validationResult} = require('express-validator/check');
const bcrypt = require("bcryptjs");
// const auth = require("../../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const gravatar = require("gravatar");
const User = require('../../models/User');


router.post('/',[
    check('name', 'Name is Required')
    .not()
    .isEmpty(),
    check('email', 'please include a valid email')
    .isEmail(),
    check('password', 'please enter a password with 6 or more characters')
    .isLength({ min: 6}) 
],
 async(req,res) =>{ 
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array() });
     }
const {name ,email , password} = req.body;
try {
    let user = await User.findOne({email});

    if(user){
        return res
        .status(400)
        .json({errors: [{msg: 'Invalid Credentials'}] });
    }
    
    //get users gravatar
const  avatar = gravatar.url(email,{
   s: '200',
   r: 'pg',
   d: 'rm'
})
user = new User({
   name,
   email,
   avatar,
   password
})
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(password, salt);

   await user.save();
    //return jsonwebToekn

const payload = {
    user: {
        id: user.id
    }
};
jwt.sign(
    payload,
     config.get('jwtSecret'),
     {expiresIn: 360000 },
     (err , token) => {
         if(err) throw err;
         res.json({ token });
     }
);
} catch (err) {
    console.error(err.message);
    res.status(500).send('something went wrong');
}
}
);
 


module.exports = router;