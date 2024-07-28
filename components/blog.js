// components/Blog.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Blog() {
const [blogPosts, setBlogPosts] = useState([]);
const [title, setTitle] = useState('');
const [subtitle, setSubtitle] = useState('');
const [body, setBody] = useState('');
const [image, setImage] = useState('');

useEffect(() => {
axios.get('/api/blog')
.then(response => {
setBlogPosts(response.data);
})
.catch(error => {
console.error(error);
});
}, []);

const handleSubmit = async (e) => {
e.preventDefault();
try {
const response = await axios.post('/api/blog', {
title,
subtitle,
body,
image,
});
setBlogPosts([...blogPosts, response.data]);
} catch (error) {
console.error(error);
}
};

return (
<div>
<form onSubmit={handleSubmit}>
<label>
Title:
<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
</label>
<label>
Subtitle:
<input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
</label>
<label>
Body:
<textarea value={body} onChange={(e) => setBody(e.target.value)} />
</label>
<label>
Image:
<input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
</label>
<button type="submit">Post</button>
</form>
<ul>
{blogPosts.map(blogPost => (
<li key={blogPost._id}>
<h2>{blogPost.title}</h2>
<h3>{blogPost.subtitle}</h3>
<p>{blogPost.body}</p>
<img src={blogPost.image} alt={blogPost.title} />
</li>
))}
</ul>
</div>
);
}