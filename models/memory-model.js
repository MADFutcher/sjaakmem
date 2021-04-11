const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memorySchema = new Schema({
        title:{
            type: String,
            required: [true, 'Please provide a title']
        },
        memory:{
            type: String,
        },
        image: {
            type: String,
        },
        owner: {
            type: String,
            required: [true, 'Please provide your name']
        },
        textColour:{
            type: String,
            default:'#000',
        },
        cardColour:{
            type: String,
            default:'#fff',
        },
        category: {
            type: String,
            enum:['public','private'],
            default: 'public'
        }
    },
    {
        timestamps: true,

    }
)


const Memory = mongoose.model("Memory", memorySchema);
module.exports = Memory;