const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const secret = "akshatgera@1234"

const User = require("../Models/user");

router.post(
  "/validate",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

      const user = await User.findOne({
        email,
      })
    if(!user){
      return res.status(400).json({error : "Enter Valid Credentials"})
    }
    const comparePassword = await bcrypt.compare(password,user.password);
    if(!comparePassword){
      return res.status(400).json({error : "Enter Valid Credentials"})
    }

    const data = {
      user : {
        id : user.id
      }
    }
    
    const authToken = jwt.sign(data,secret)

    return res.json({success : true,authToken : authToken})
  }
);


router.post(
  "/create",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, email, location, password } = req.body;

    let salt = await bcrypt.genSalt(10);
    let hashedpassword = await bcrypt.hash(password,salt)


    try {
      const user = await User.create({
        name: name,
        email: email,
        password: hashedpassword,
        location: location,
      });
      res.status(201).json({success : true});
    } catch (err) {
      res.status(500).json({ success : false });
    }
  }
);

module.exports = router;
