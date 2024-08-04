const { json } = require("body-parser");
const Todo = require("../models/Todo");
const moment = require("moment");

const homeController = async (req, res, next) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });

    res.locals.moment = moment; // עשה שימוש ב-moment בתצוגה שלך
    res.render("index", { title: "list todo", todos });
  } catch (error) {
    res.status(500).json({ message: error.message }); // תיקון שגיאת כתיב
  }
};

const addTodoFormController = (req, res, next) => {
  try {
    res.render("newtodo", { title: "New-todo" });
    res.status(200);
  } catch (error) {
    res.status({ massage: error.massage });
  }
};

const updateTodoFormController =async (req, res, next) => {
  try {
    const{id}=req.query;
    const todo = await Todo.findById(id);
    res.render("updateTodo", { title: "Update-todo" ,todo});
    res.status(200);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
};

const deleteTodoPageController = (req, res, next) => {
  try {
    const {id}=req.query;
  

    res.render("deleteTodo", { title: "Delete-todo",id }).status(200);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
};

const AddTodoController = async (req, res, next) => {
  try {
    const { title, desc } = req.body;
    if (!title) {
      return res.status(400).json({ massage: "title is requierd" });
    }

    const newTodo = new Todo({ title, desc });

    await newTodo.save();

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
};


const updateTodoController = async (req,res,next)=>{

  try{
 const {id}=req.params;
  const{title,desc}=req.body;
 const todo =await  Todo.findById(id);
  if(!todo)
  {
    return res.status(404).json({massage:'Todo not found ..'})
  }
   todo.title=title;
   todo.desc=desc;
   await todo.save();
   res.redirect('/')
  }catch(error){
    
    res.status(500).json({massage:error.massage});
  }

}

const deleteTodoController = async (req, res, next) => {
  try {
    const { id, confirm } = req.query;

    if (confirm === "yes") {
      await Todo.findByIdAndDelete(id);
      return res.redirect('/');
    } else {
      return res.redirect('/');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
module.exports = {
  homeController,
  addTodoFormController,
  updateTodoFormController,
  deleteTodoPageController,
  AddTodoController,
  updateTodoController,
  deleteTodoController 
  
};
