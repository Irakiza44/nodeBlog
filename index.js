const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {
    result
} = require('lodash');
const {
    render
} = require('ejs');
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();

//connect to db mongo
const dbURI = '';
mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});


// Redirect root to all blogs
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// Render about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

// blogs routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404'
    });
});