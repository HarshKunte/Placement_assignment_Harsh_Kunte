const express = require('express');
const app = express();

// Sample posts data
const posts = [
  { id: 1, title: 'Post 1', content: 'Content of Post 1' },
  { id: 2, title: 'Post 2', content: 'Content of Post 2' },
  // ... add more posts here
];

// Endpoint to get 20 posts
app.get('/post', (req, res) => {
  // Get the first 20 posts
  const twentyPosts = posts.slice(0, 20);
  res.json({success:true, twentyPosts});
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
