const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    title: document.querySelector('#title').value,
    subtitle: document.querySelector('#subtitle').value,
    image: document.querySelector('#image').files[0],
    body: document.querySelector('#body').value,
    comment: document.querySelector('#comment').value,
    like: document.querySelector('#like').value,
    share: document.querySelector('#share').value,
  };
  const blogsContainer = document.getElementById('blogs-container');
  const blogs = [
    {
      title: 'Blog Post 1',
      author: 'Author 1',
      date: '2024-07-01',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      title: 'Blog Post 2',
      author: 'Author 2',
      date: '2024-07-15',
      content: 'Suspendisse commodo, purus sed scelerisque vehicula, erat erat facilisis dui, non venenatis tortor lacus ut purus.'
    },
    {
      title: 'Blog Post 3',
      author: 'Author 3',
      date: '2024-08-01',
      content: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer condimentum fermentum orci, a facilisis eros gravida sit amet.'
    }
  ];

  // Function to render blogs
  function renderBlogs() {
    blogsContainer.innerHTML = '';
    blogs.forEach(blog => {
      const blogElement = document.createElement('div');
      blogElement.className = 'blog-post';
      blogElement.innerHTML = `
        <h2>${blog.title}</h2>
        <p><strong>Author:</strong> ${blog.author}</p>
        <p><strong>Date:</strong> ${blog.date}</p>
        <p>${blog.content}</p>
      `;
      blogsContainer.appendChild(blogElement);
    });
  }

  renderBlogs();
  fetch('/api/blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
});
