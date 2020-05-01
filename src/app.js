const path = require('path');
const express = require('express');

const app = express();
const morgan = require('morgan');
const db = require('./db');

const PORT = process.env.PORT || 3000;
// const authenticate = require('./middleware/authenticate');


const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
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

  // error handling endware
  app.use((err, req, res) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || `${err.status}: Internal server error.`);
  });
};

const syncDb = () => db.sync();

const startListening = () => {
  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
};

async function startApp() {
  await syncDb();
  createApp();
  startListening();
}

startApp();
