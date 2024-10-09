const express = require('express');
const prisma = require('../config/prisma');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();
router.use(authenticate);

// Create Todo
router.post('/', async (req, res) => {
  const { title } = req.body;
  const todo = await prisma.todo.create({
    data: { title, userId: req.user.id },
  });
  res.json(todo);
});

// Get Todos
router.get('/', async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: { userId: req.user.id },
  });
  res.json(todos);
});

// Additional routes for updating and deleting todos...

module.exports = router;
