const express = require('express');
const { all } = require('express/lib/application');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const todoHandler = require('./routerHandler/todoHandler.js');


mongoose
    .connect('mongodb://localhost:27017/todos',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() => { console.log('Connected to MongoDB') })
    .catch((err) => { console.error('Could not connect to MongoDB', err) });


app.use('/todo', todoHandler);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})