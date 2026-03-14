const express = require('express');
const healthRoutes = require('./routes/health.routes');
const bookRoutes = require('./routes/books.routes');
const userRoutes = require('./routes/users.routes');

const app = express();
app.use(express.json());

app.use('/health', healthRoutes);
app.use('/books', bookRoutes);
app.use('/users', userRoutes);

module.exports = app;