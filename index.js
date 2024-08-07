
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

app.use(express.json());
dotenv.config();
app.use(express.urlencoded({ extended: true }));

const todoHandler = require('./routerHandler/todoHandler');
const userHandler = require('./routerHandler/userHandler');


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://memories:kkhAipmOQ0VeNyuc@cluster0.q0gttvx.mongodb.net/')
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

app.use('/todo', todoHandler);
app.use('/user', userHandler);


app.listen(3000, () => {
    console.log('Server started on port 3000');
    connectDB();
})