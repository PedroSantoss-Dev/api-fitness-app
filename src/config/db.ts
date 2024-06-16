import mongoose from "mongoose";

const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);  
        console.log('MongoDB connected...');   
    } catch (error) {
        console.log("failed to connect");
        process.exit(1);
    };
};
export default ConnectDb;