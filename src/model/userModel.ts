import mongoose from "mongoose";
import bcrypt from "bcryptjs";


interface IUser {
    name: string
    email: string
    password: string
    age: number
    Weight: number
    height: number
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    Weight: { type: Number, required: true },
    height: { type: Number, required: true },
    password: { type: String, required: true },
});

const User  = mongoose.model<IUser>("User", userSchema);
export default User