const mongoose = require('mongoose');
const db = "mongodb://localhost:27017/mediajigs";

async function connectDB(){
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MongoDB connected");
    }
    catch (err) {
        console.log(err.message);
    }
  }

module.exports.connectDB = connectDB();