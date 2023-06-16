import mongoose from "mongoose";

let isConnected = false

export const connectionToDb = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('mongodb is already connected')
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.MONGO_DATABASENAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true
        console.log('mongodb is connected')
    } catch (error) {
        console.log(error)
    }
}