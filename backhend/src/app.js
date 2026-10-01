const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const blogRoutes = require('./routes/blog.routes');

const app = express();
app.use(express.json());
app.use(cookieParser());


/* Apis*/
app.use('/api/user',authRoutes);
app.use('/api/blog',blogRoutes);


module.exports = app;