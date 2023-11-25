/*
Each todo has a title and a description. Both the sections are strings.
The server should have following API endpoints.
  1.ROUTE : "/todos", METHOD : "GET" - Retrieves all todo items
    Returns a list of todo items with 200 OK response and all the todo items should be returned
    in a array in JSON format

  2.ROUTE : "/todos/:id", METHOD : "GET" - Retrieve a specific todo item by ID
    Returns the todo item from the todos list identified by ID.Response is 200 OK with item is JSON format
    and 404 if not found

  3.ROUTE : "/todos", METHOD : "POST" - Create a new todo item
    Creates a new todo item and also generate a unique id.Request body is JSON object.
    Return the new todo in JSON format with 201 response.

  4.ROUTE : "/todos/:id", METHOD : "PUT" - Update an existing todo item by ID
    Updates the existing todo identified by it's ID. Request body is JSON object.
    Return the updated todo in JSON format with 200 OK response and 404 if not found.

  5. DELETE /todos/:id - Delete a todo item by ID
    Deletes the existing todo identified by it's ID. 
    If deleted response will be 200 OK else 404 if not found.

    - For any other route not defined in the server return 404
*/
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

var todos = [];

app.get("/todos",(req,res)=>{
  res.status(200).json(todos);
})

app.get("/todos/:id",(req,res)=>{
  let todoIndex = todos.findIndex((t)=> t.id === parseInt(req.params.id));
  if(todoIndex === -1) res.status(404).send();
  else{
    res.json(todos[todoIndex]);
  }
})

app.post("/todos",(req,res)=>{
  const newTodo = {
    id : Math.floor(Math.random() * 10000),
    title : req.body.title,
    description : req.body.description
  }
  todos.push(newTodo);
  res.status(201).json(newTodo)
});

app.put("/todos/:id",(req,res)=>{
  let todoId = parseInt(req.params.id);
  let todoIndex = null;
  var todoExist = false;
  for(let i = 0;i<todos.length;i++){
    if(todos[i].id === todoId){
      todoIndex = i;
      todoExist = true;
      break;
    }
  }
  if(todoExist){
    todos[todoIndex].title = req.body.title;
    todos[todoIndex].description = req.body.description;
    res.status(200).send();
  }
  else res.status(404).send();
})

app.delete("/todos/:id",(req,res)=>{
  let todoIndex = todos.findIndex((t)=> t.id === parseInt(req.params.id));
  if(todoIndex === -1){
    res.status(404).send();
  }
  else{
    let newTodos = [];
    for(let i = 0;i<todos.length;i++){
      if(i === todoIndex) continue;
      else{
        newTodos.push(todos[i]);
      }
    }
    todos = newTodos;
    res.status(200).send();
  }
});

app.use((req,res,next)=>{
  res.status(404).send();
});