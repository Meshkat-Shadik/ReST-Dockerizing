const express = require('express');
const router = express.Router();
const pool = require('./db');



router.use((req,res,next)=>{
    console.log("A request came in");
    next();
});

//ROUTES

//get all todos
router.get("/todos",async(req,res)=>{
    try {
       // console.log( req.body);
       const allTodo = await pool.query("SELECT * FROM todo");
        res.json(allTodo.rows);
    } catch (error) {
        console.log(error.message);
    }
});


//get a todo
router.get("/todos/:id",async(req,res)=>{
    try {
       const {id} = req.params; 
       const todo = await pool.query("SELECT * FROM todo WHERE todo_id=($1)",[id]);
        res.json(todo);
    } catch (error) {
        console.log(error.message);
    }
});




//create a todo
router.post("/todos",async(req,res)=>{
    try {
       // console.log( req.body);
       const {description} =  req.body;
       const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",[description]);
        res.json(newTodo);
    } catch (error) {
        console.log(error.message);
    }
});

//update a todo
router.put("/todos/:id",async(req,res)=>{
    try {
       const {id} = req.params; 
       const {description}=req.body;
       const updateTodo = await pool.query("UPDATE todo SET description = $1 where todo_id = $2",[description,id]);
        res.json("Updated Successfully");
    } catch (error) {
        console.log(error.message);
    }
});




//delete a todo
router.delete("/todos/:id",async(req,res)=>{
    try {
       const {id} = req.params; 
       const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
        res.json("Deleted Successfully");
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;