const express = require('express');
const app = express();

// Sample posts data
const posts = [
    { id: 1, title: 'Post 1', content: 'Content of Post 1' },
    { id: 2, title: 'Post 2', content: 'Content of Post 2' },
  ];

// middleware to check authentication
const authenticate = (req, res, next) => {
  const isAuthenticated = checkLoginFromDb(); //verify data from db
  
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).json({success:false, error: 'Unauthorized' });
  }
};

app.get('/post', authenticate, (req, res) => {
  const twentyPosts = posts.slice(0, 20);
  res.json(twentyPosts);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

