import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('using existing connection');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "thoughtshare",
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
        console.log('mongoConnected');
    } catch (error) {
        console.log('mongoConnectionError', error);
    }

}