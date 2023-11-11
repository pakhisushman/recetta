//framework to create our api
import express from "express";
//library that allows you to communicate between your frontend and backend
import cors from "cors";
//write queries and manage data
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

//create a version of our api
const app=express();
//By adding app.use(express.json()) as middleware in your Express application, you enable the server to automatically parse JSON data from incoming requests and make it available in the req.body property of the request object. This way, you can easily work with the JSON data as a JavaScript object in your route handlers.
//whenever data is sent through frontend, data is converted to json object
app.use(express.json());
app.use(cors());
//now whatever routes you create its gonna start with /auth
app.use("/auth",userRouter);
app.use("/recipes",recipesRouter);

mongoose.connect(
"mongodb+srv://user123:diyahinger123@cluster0.nwbn5mr.mongodb.net/recetta?retryWrites=true&w=majority"
);


app.listen(3001,()=>{
  console.log("server started");
})

