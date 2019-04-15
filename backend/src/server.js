const express = require('express');
const path = require('path');
const logger = require('morgan');
const serveStatic = require('serve-static');
const mongoose = require('mongoose');

const config = require('./util/config');
const restRouter = require('./util/restRouter');

console.log(`ENV :: ${config.currEnv}`);
console.log(`PORT :: ${config.port}`);

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(config.db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Declare an app from express
const app = express();

//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Endpoints
app.use('/api', restRouter);

if (config.currEnv === 'production') {
  const staticPath = path.resolve(__dirname, '../../frontend/build');
  app.use(
    serveStatic(staticPath, {
      maxAge: '0',
      setHeaders: function(res, path) {
        res.setHeader(
          'Cache-Control',
          'private, no-cache, no-store, must-revalidate'
        );
        res.setHeader('Expires', '-1');
        res.setHeader('Pragma', 'no-cache');
      }
    })
  );
}

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next({
    status: 404,
    message: 'Not Found'
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  const error = {
    status: err.status || 500,
    message: err.message || 'Server Error'
  };
  res.status(err.status).json(error);
});

app.listen(config.port, () => {
  console.log(`Server Listening on Port :: ${config.port}`);
});
