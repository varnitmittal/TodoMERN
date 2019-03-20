const express = require('express');
const router = express.Router();
const todoSchema = require('../models/todo.schema');

//custom error route
router.get('/error', (req,res) => {
    throw new Error ('This is a forced error');
});

//Todos Filter QueryString end-point
router.get('/', (req,res) => {
    if(!req.query)
    {    todoSchema.find()
        .then(todos => {
            res.json(todos);
        })
        .catch(err => {
            res.json(err.message);
        })
    }
    else{    
        let query = req.query;
        todoSchema.find(query)
        .then(todos => {
            res.json(todos);
        })
        .catch(err => {
            res.json(err.message);
        })
    }
});

//Todo Add end-point (CREATE)
router.post('/add', (req,res) => {
    let todoLocal = new todoSchema(req.body);
    todoLocal.save()
    .then(todo => {
        res.status(200).json(todo)
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
})

//Todo (id) Search params end-point (READ)
router.get('/:id', (req,res) => {
    let id = req.params.id;
    todoSchema.findById(id)
    .then(todo => {
        res.json(todo)
    })
    .catch(err => {
        res.json(err.message)
    })
});

//Todo Update (by id) params endpoint (UPDATE)
router.post('/update/:id', (req,res) => {
    let id = req.params.id;
    todoSchema.findById(id)
    .then(todo => {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
        todo.save()
        .then(todo => {
            res.status(200).json(todo);
        })
        .catch(err => {
            res.status(400).json(err.message);
        })
    })
    .catch(err => {
        res.status(404).json(err.message);
    })
});

//Todo Delete (by id) params endpoint (DELETE)
router.get('/delete/:id', (req,res) => {
    let id = req.params.id;
    todoSchema.findById(id)
    .then(todo => {
        if (todo._id == id)
        {
            console.log("FOUND!!")
            todoSchema.findByIdAndDelete(id)
            .then(todo => {
                res.status(200).json({
                    message: `Deleted Todo with id: ${id}`
                });
                console.log("Deleted!!")
            })
            .catch(err =>{
                res.status(500).json(err.message)
            })
        }
    })
    .catch(err => {
        console.log("Document doesn't exist")
        res.status(404).json(err.message);
        })
});
module.exports = router;
