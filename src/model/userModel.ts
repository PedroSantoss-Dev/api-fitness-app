import mongoose from "mongoose";
import bcrypt from "bcryptjs";


interface IUser {
    name: string
    email: string
    password: string
    age: number
    Weight: number
    height: number
    comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    Weight: { type: Number, required: true },
    height: { type: Number, required: true },
    password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

const User  = mongoose.model<IUser>("User", userSchema);

export default User;