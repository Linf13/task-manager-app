const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = 'secret123'; // Should match auth.js

// Middleware to verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token missing' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
}

// Get all tasks for the authenticated user
router.get('/', verifyToken, async (req, res) => {
  const tasks = await req.tasksDB.find({ userId: req.userId });
  res.json(tasks);
});

// Add a new task
router.post('/', verifyToken, async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const task = await req.tasksDB.insert({ title, completed: false, userId: req.userId });
  res.status(201).json(task);
});

// Update a task
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updated = await req.tasksDB.update({ _id: id, userId: req.userId }, { $set: updates });
  res.json({ updated });
});

// Delete a task
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  await req.tasksDB.remove({ _id: id, userId: req.userId });
  res.json({ message: 'Task deleted' });
});

module.exports = router;
