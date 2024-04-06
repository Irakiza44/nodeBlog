const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();

// Create a new blog post
router.get('/blogs/create', (req, res) => {
    res.render('create', {
        title: 'Create a new blog'
    });
});

// Retrieve a specific blog post
router.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', {
                blog: result,
                title: 'Blog details'
            })
        })
        .catch((error) => {
            console.log(error)
        })
});

// Create a new blog post
router.post('/blogs', (req, res) => {
    const blog = Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((error) => {
            console.log(error)
        })
})

// Display all blogs
router.get('/blogs', (req, res) => {
    Blog.find().sort({
            createdAt: -1
        })
        .then(result => {
            res.render('index', {
                blogs: result,
                title: 'All blogs'
            });
        })
        .catch(err => {
            console.log(err);
        });
});

// Delete a blog post
router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({
                redirect: '/blogs'
            });
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = router;