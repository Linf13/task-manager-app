const express = require('express');
const cors = require('cors');
const nedb = require('nedb-promises');

const app = express();
const tasksDB = nedb.create({ filename: './data/tasks.json', autoload: true });

app.use(cors());
app.use(express.json());

app.use(express.static('../client'))

app.use('/api',require('./routes/auth.js'))

// Health check route
//app.get('/', (req, res) => {
//  res.send('🧠 Task Manager API is running...');
//});

// 🔽 GET all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await tasksDB.find({});
  res.json(tasks);
});

// 🔽 POST a new task
app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const task = await tasksDB.insert({ title, completed: false });
  res.status(201).json(task);
});

// 🔽 DELETE a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await tasksDB.remove({ _id: id });
  res.json({ message: 'Task deleted' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Simplified Task Manager running at http://localhost:${PORT}`);
});
