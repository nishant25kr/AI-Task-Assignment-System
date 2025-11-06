import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
        enum: ['user', 'employee', 'admin']
    },
    skills: [String]

}, { timestamps: true })

export default mongoose.model('User', userSchema)