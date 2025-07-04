import moongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const UserSchema = new moongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})


UserSchema.methods.isPasswordCorrect = async function (password) {
    if (!this.password) {
        throw new Error("Password not found in user document");
    }
    return await bcrypt.compare(password, this.password);
}

// not use arrow function in this operation
UserSchema.methods.generateAccessToken = function () {
    // console.log("Inside Generate access token function");
    
    if (!this._id) {
       console.log('====================================');
       console.log("User Id is not find");
       console.log('====================================');
    }
    return jwt.sign(
        { id: this._id },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "2h" }
    );
};



// UserSchema.method.GenerateAccessToken 
export const User = moongoose.model('User', UserSchema);