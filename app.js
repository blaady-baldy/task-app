import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Task from './models/taskModel.js'

const app = express();
dotenv.config();

//Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine","ejs");


const URI = process.env.URL;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err)
        throw err;
        console.log("Connected to MongoDB");
        app.listen(3000);
});

app.get("/", async function(req, res){
    const allTasks = await Task.find();
    // console.log(allTasks);
    res.render("index", {allTasks});
});

app.post("/addTask", async function(req,res){
    const newDesc = req.body.newTask;
    const newTaskAdd = new Task({
        desc:newDesc,
        done:false
    });
    try{
        Task.create(newTaskAdd);
    }catch(err){
        console.log(err);
    }
    res.redirect("/");
});

app.get("/delete/task/:id",async function(req,res){
    try{
        await Task.findByIdAndDelete(req.params.id);
    }
    catch(err)
    {
        console.log(err);
    }
    
    res.redirect("/");
  });