import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export function dbStartUp() {
    //   const MongoClient = mongodb.MongoClient;
    const uri = process.env.db;
    //   return mongoose.connect(uri, {
    //     useNewUrlParser: true,
    //     useFindAndModify: false
    //   });
    mongoose
        .connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        .then(() => console.log(`Connected to database`))
        .catch(err => {
            console.log("Error ", err);
        });

}