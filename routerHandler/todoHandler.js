
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Todo = require('../schemas/todoSchema');
const { status } = require('express/lib/response');
const Todos = new mongoose.model('Todos', Todo);

//save data
router.post('/', async (req, res) => {

    try {
        const title = req.body.title;
        const description = req.body.description;
        const status = req.body.status;
        const newTodo = new Todos({
            title,
            description,
            status
        })
        const todo = await newTodo.save();
        res.status(200).send(todo);
    } catch (error) {
        res.status(500).send({
            message: `Error while saving todo`,
            error: error.message
        });
    }
})

module.exports = router;