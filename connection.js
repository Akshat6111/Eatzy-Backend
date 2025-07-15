const mongoose = require("mongoose");
const URL = process.env.MONGO_URL
const mongooseConnect = async ()=>{
   await mongoose.connect(URL)
    .then(()=>{console.log("MongoDB Connection Successfull")})
    .catch((err)=>{console.log("MongoDB Connection Failed : ",err)})
    const fooditems = mongoose.connection.db.collection("Sample");
    const foodCategory = mongoose.connection.db.collection("FoodCategory");
    const categoryData = await foodCategory.find({}).toArray();
    const data = await fooditems.find({}).toArray();
    global.Sample = data;
    global.FoodCategory = categoryData
}

module.exports = {
    mongooseConnect,
}