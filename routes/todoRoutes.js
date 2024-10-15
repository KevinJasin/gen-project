const express = require('express');
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management
 */

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, createTodo);

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Retrieve all todos
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of todos
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', authMiddleware, getTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, updateTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Todo deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, deleteTodo);

module.exports = router;
