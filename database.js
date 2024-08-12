
// database.js
const mongoose = require('mongoose');

// Define schema for Products
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Define schema for BlogPosts
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});


// Create models
const Product = mongoose.model('Product', productSchema);
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Product, BlogPost, User };


Client (React.js);
const mongoose = require('mongoose');

   // Define schema for Products
   
   // Define schema for BlogPosts
   

   // Define schema for Users
   const userSchema = new mongoose.Schema({
     name: {
       type: String,
       required: true,
     },
     email: {
       type: String,
       required: true,
     },
     password: {
       type: String,
       required: true,
     },
   });


   module.exports = { Product, BlogPost, User };