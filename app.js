const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const conectMongodb = require("./init/mongodb");
const Todoroutes = require("./Routes/todo");

const dotenv= require('dotenv');
dotenv.config();

const app = express();

conectMongodb();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Todoroutes);

module.exports=app;
