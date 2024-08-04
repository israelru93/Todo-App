
const mongoose =require('mongoose');

const TodoSchema = mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String }, // תיקון סוג המחרוזת
}, { timestamps: true });

const Todo=mongoose.model('Todo',TodoSchema )


module.exports=Todo;
