const express = require("express");
const router = express.Router();

router.post("/fooddata",(req,res)=>{
    try {
        res.send([global.Sample,global.FoodCategory])
    } catch (err) {
        res.send("Error : ",err);
    }
})

module.exports = router