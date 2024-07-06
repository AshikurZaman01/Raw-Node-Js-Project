
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Todo = require('../schemas/todoSchema');
const { status } = require('express/lib/response');
const res = require('express/lib/response');
const Todos = new mongoose.model('Todos', Todo);

router.get('/active', async (req, res) => {

    try {
        const todo = new Todos();
        const todos = await todo.findActive();
        res.status(200).send(todos);
    } catch (error) {
        res.status(500).send({
            message: `Error while getting todo`,
            error: error.message
        });
    }

})

//get all data
router.get('/', async (req, res) => {
    try {
        const todos = await Todos.find();
        res.status(200).send(todos);
    } catch (error) {
        res.status(500).send({
            message: `Error while getting todo`,
            error: error.message
        });
    }
})

//get a data by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todos.findById({ _id: id });
        res.status(200).send(todo);
    } catch (error) {
        res.status(500).send({
            message: `Error while getting todo`,
            error: error.message
        });
    }
})


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

//save multiple data
router.post('/all', async (req, res) => {
    try {
        const todos = await Todos.insertMany(req.body);
        res.status(200).send(todos);
    } catch (error) {
        res.status(500).send({
            message: `Error while saving todo`,
            error: error.message
        });
    }
})

//update data
router.put('/:id', async (req, res) => {
    try {

        const todo = await Todos.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status
            }
        }, { new: true, useFindAndModify: false });
        res.status(200).send(todo);

    } catch (error) {
        res.status(500).send({
            message: `Error while updating todo`,
            error: error.message
        });
    }
})

module.exports = router;