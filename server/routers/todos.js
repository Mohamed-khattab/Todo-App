const { Router } = require('express');
const { TodoRecord } = require('../records/todo.record');
const authenticateToken = require('../middlewares/authMiddleware');

const TodoRouter = Router();

TodoRouter.get('/', authenticateToken, async (req, res) => {
  try {
    const todosList = await TodoRecord.listAll();

    res.send(todosList);
  } catch (error) {
    console.error('Error retrieving todos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

TodoRouter.post('/create', authenticateToken, async (req, res) => {
  try {
    const newTodo = new TodoRecord(req.body);
    await newTodo.insert();

    res.send('Values inserted successfully');
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

TodoRouter.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const todo = await TodoRecord.getOne(req.params.id);
    await todo.delete();

    res.send('Todo deleted successfully');
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

TodoRouter.put('/update/:id', authenticateToken, async (req, res) => {
  try {
    const todo = await TodoRecord.getOne(req.params.id);
    await todo.update(req.body.id, req.body.todo);

    res.send('Todo updated successfully');
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
  TodoRouter,
};
