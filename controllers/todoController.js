const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTodo = new Todo({
      title,
      description,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo' });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description, status }, { new: true });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
};
