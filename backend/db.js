const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

const mongoconn = async () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, () => {
        console.log("connected to db");
    })
}

module.exports = mongoconn