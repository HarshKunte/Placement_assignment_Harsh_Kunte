const blogsContainer = document.getElementById('blogsContainer');
const addBlogForm = document.getElementById('addBlogForm');
const titleInput = document.getElementById('titleInput');
const contentInput = document.getElementById('contentInput');
let allBlogs;
function fetchBlogs() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((blogs) => {
      allBlogs = [...blogs]
      displayBlogs(allBlogs);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayBlogs(blogs) {
  blogsContainer.innerHTML = '';

  blogs.forEach((blog) => {
    const blogElement = document.createElement('div');
    blogElement.classList.add('blog');
    blogElement.innerHTML = `
      <h3>${blog.title}</h3>
      <p>${blog.body}</p>
      <button class="delete-button" data-id="${blog.id}">Delete</button>
    `;

    blogsContainer.appendChild(blogElement);
  });

  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteBlog);
  });
}

function addBlog(event) {
  event.preventDefault();

  const title = titleInput.value;
  const content = contentInput.value;

  const newBlog = {
    id: allBlogs.length+1,
    title: title,
    body: content,
  };

  allBlogs.unshift(newBlog)
  displayBlogs(allBlogs)

}

// Delete a blog
function deleteBlog(event) {
  const blogId = event.target.getAttribute('data-id');
  allBlogs = allBlogs.filter(blog => blog.id != blogId)
  displayBlogs(allBlogs)
}

// Event listeners
addBlogForm.addEventListener('submit', addBlog);

// Fetch and display blogs on page load
fetchBlogs();
