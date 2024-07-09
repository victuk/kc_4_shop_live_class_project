const express = require('express')
const logger = require('morgan')
const uid = require('uuid')

const server = express()

server.use(express.json())

server.use(express.urlencoded({extended: false}));

server.use(logger('dev'))

let Task = [];

server.get('/tasks', (req, res) => {
    res.send(Task)
});

server.post('/task', (req, res) => {
    const Task_Traking = req.body;
    const id = uid.v4();

    Task.push({
        id,
        task_name: Task_Traking.task_name,
        task_des: Task_Traking.task_des,
        status: Task_Traking.status
    });

    res.send('added')
})

server.get('/task/:id', (req, res) => {
    const taskID = req.params.id;
    const taskFound = Task.find(task => task.id == taskID)
    res.send(taskFound);
})

server.put('/task/:id', (req, res) => {
    const update = req.body;
    const taskID = req.params.id;

    for(let i = 0; i < Task.length; i++){
        if(Task[i].id == taskID) {
            Task[i].task_name = update.task_name
            Task[i].task_des = update.task_des
        }
    }

    res.send('updated successfully')
})

server.patch('/task/:id', (req, res) => {
    const changeStatus = req.body.status;
    const taskID = req.params.id;

    for(let i = 0; i < Task.length; i++){
        if(Task[i].id == taskID) {
            Task[i].status = changeStatus
        }
    }

    if(!changeStatus){
        res.status(404).send('Invalid item')
    } else {
        res.send('status updated successfully')
    }

})

server.delete('/task/:id', (req, res) => {
    const deleteId = req.params.id
    Task = Task.filter(task => task.id != deleteId) 
    res.send('deleteed successfully')
})

server.listen(3000, function () {
    console.log('server is running')
})