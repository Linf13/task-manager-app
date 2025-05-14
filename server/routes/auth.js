const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nedb = require('nedb-promises');

const router = express.Router();
const SECRET = 'secret123'; // Use env variable in production

const usersDB = nedb.create({ filename: './data/users.json', autoload: true });


// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  //const usersDB = req.usersDB;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  const existing = await usersDB.findOne({ username });
  if (existing) return res.status(409).json({ message: 'Username already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await usersDB.insert({ username, password: hashedPassword });
  res.status(201).json({ id: newUser._id, username: newUser.username });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  //const usersDB = req.usersDB;

  const user = await usersDB.findOne({ username });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
