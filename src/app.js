const path = require('path');
const express = require('express');

const app = express();
const morgan = require('morgan');

// const authenticate = require('./middleware/authenticate');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.get('/', (req, res, next) => {
  try {
    res.send('the first login page is working');
  } catch (err) {
    next(err);
  }
});

// app.get('/login', authenticate);

app.listen(3000, () => console.log('App listening on port 3000!'));
