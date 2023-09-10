import mongoose from 'mongoose';

function connectToDB() {
    mongoose.connect(process.env.MONGODB_URI!);
}

export { connectToDB };
