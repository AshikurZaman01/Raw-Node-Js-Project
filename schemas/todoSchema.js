
const express = require('express');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = todoSchema;