const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const secretKey = 'my-secret';

const users = [
  { id: 1, username: 'user1', password: '1234' },
  { id: 2, username: 'user2', password: '12345' }
];

// Sign up
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  // Check if the username already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({status:false, message: 'Username already exists' });
  }
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);
  res.status(201).json({ message: 'User created successfully', users });
});

// Login 
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Check if the user exists
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({status:false, message: 'Invalid credentials' });
  }
  // Generate JWT
  const token = jwt.sign({ userId: user.id }, secretKey);
  res.json({status:true, token });
});

// Protected Route
app.get('/protected', verifyToken, (req, res) => {
  res.json({status:true, message: 'Protected route accessed successfully' });
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({status:false, message: 'No token provided' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({status:false, message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
