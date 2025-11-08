import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, 'Username must be at most 20 characters long'], 
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] 
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [4, 'Password must be at least 4 characters long'] 
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    orders: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Order"
        }
    ]
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;