const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'newuser'
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    dob:{
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phoneno: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('newprofile', profileSchema);