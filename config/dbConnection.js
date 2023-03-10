const mongoose = require('mongoose');

const dbConnection = async() =>{
    try {
         await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
          })
          console.log('database connected!!')

    } catch (error) {
        console.log("somthing went wrong", error)
    }
}

module.exports = dbConnection;