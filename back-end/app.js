const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');


/*
CORS - Cross Origin Request Security.
localhost:3000 - backend api
localhost:4200 -frontend
 */

 const List = require('./database/models/list');
 const Task = require('./database/models/task');
 app.use(express.json());

 app.use((req, res, next) => {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTION, PUT, PATCH, DELETE");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 }); 

 /*
 List: Creat, Update, ReadOne, ReadAll, Delete
 Task: Creat, Update, ReadOne, ReadAll, Delete
 */

 /* LISTS CRUD */

 app.get('/lists', (req, res) => {
     List.find({})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error));
 });

 app.post('/lists', (req, res) => {
     (new List({ 'title': req.body.title}))
        .save()
        .then(lists => res.send(lists))
        .catch((error) => console.log(error));
 });

 app.get('/lists/:listId', (req, res) => {
     List.findOne({ '_id': req.params.listId})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error));       
 });

 app.patch('/lists/:listId', (req, res) => {
     List.findOneAndUpdate({ '_id': req.params.listId}, { $set: req.body})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error));
 });

 app.delete('/lists/:listId', (req, res) => {
     const deleteTasks = (list) => {
         Task.deleteMany({_listId: list._id})
            .then(() => list)
            .catch((error) => console.log(error));
     };
    List.findOneAndDelete(req.params.listId)
    .then(lists => res.send(deleteTasks(lists)))
    .catch((error) => console.log(error));
 });

 /* http://loccalhost:3000/lists/:listId/tasks/:taskId */

  /* TASKS CRUD */

 app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({ '_listId': req.params.listId})
    .then(tasks => res.send(tasks))
    .catch((error) => console.log(error));
 });

 app.post('/lists/:listId/tasks', (req, res) => {
    (new Task({ 'title': req.body.title,'_listId': req.params.listId }))
       .save()
       .then(task => res.send(task))
       .catch((error) => console.log(error));
});

app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOne({ '_listId': req.params.listId, _id: req.params.taskId})
    .then(tasks => res.send(tasks))
    .catch((error) => console.log(error));
 });

 app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({ '_listId': req.params.listId, _id: req.params.taskId}, {$set: req.body})
    .then(tasks => res.send(tasks))
    .catch((error) => console.log(error));
 });

 app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({ '_listId': req.params.listId, _id: req.params.taskId})
    .then(tasks => res.send(tasks))
    .catch((error) => console.log(error));
 });



app.listen(3000, () => console.log("Server is Connected on port 3000"));