const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Sample blog data
let blogs = [
  { id: 1, title: 'Blog1', content: 'Content of the first blog' },
  { id: 2, title: 'Second Blog', content: 'Content of the second blog' },
  // ... add more blogs here
];

// Get all blogs
app.get('/blogs', (req, res) => {
  res.json(blogs);
});

// Get blog by ID
app.get('/blogs/:id', (req, res) => {
  const blogId = req.params.id
  const blog = blogs.find((blog) => blog.id === blogId);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

// Create new blog
app.post('/blogs', (req, res) => {
  const { title, content } = req.body;

  if (title && content) {
    const newBlog = {
      id: blogs.length + 1,
      title,
      content,
    };

    blogs.push(newBlog);
    res.status(201).json({success:true, blog: newBlog, blogs});
  } else {
    res.status(400).json({success:false, error: 'Title and content are required' });
  }
});

// Update blog by ID
app.put('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const { title, content } = req.body;

  let blog = blogs.find((blog) => blog.id === blogId);

  if (blog) {
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    res.json({success:true, blog});
  } else {
    res.status(404).json({success:false, error: 'Blog not found' });
  }
});

// Replace blog by ID
app.patch('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const { title, content } = req.body;

  let blog = blogs.find((blog) => blog.id === blogId);

  if (blog) {
    blog.title = title;
    blog.content = content;
    res.json({success:true, blog});
  } else {
    res.status(404).json({success:false, error: 'Blog not found' });
  }
});

// Delete blog by ID
app.delete('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const blogIndex = blogs.findIndex((blog) => blog.id === blogId);

  if (blogIndex !== -1) {
    const deletedBlog = blogs[blogIndex];
    blogs.splice(blogIndex, 1);
    res.json({success:true, deletedBlog});
  } else {
    res.status(404).json({success:false, error: 'Blog not found' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
