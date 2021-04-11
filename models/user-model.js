const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
        username:{
            type: String,
            required: [true, 'Please provide a username']
        },
        password:{
            type: String,
            required: [true, 'Please provide a password']
        },
        //gezin is Tess, Sjaak, Johhny
        gezin:{
            type: Boolean,
            required: [true,'Please indicate if User is gezin'],
            default:false,
        }
    },
    {
        timestamps: true,
    }
)


const User = mongoose.model("User", userSchema);
module.exports = User;