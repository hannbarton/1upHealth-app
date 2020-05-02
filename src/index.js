const path = require('path');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const morgan = require('morgan');
const db = require('./db');

const sessionStore = new SequelizeStore({ db });
const { User, Patient } = require('./db/models');

const PORT = process.env.PORT || 3000;

const authenticate = require('./middleware/authenticate');
const { create, getEverything } = require('./middleware/patient');

require('../secrets');


const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.post('/api/login', authenticate, async (req, res, next) => {
    try {
      const { accessBearerToken, username } = req;
      const user = await User.findOrCreate({ where: { username } });
      User.update({ accessBearerToken }, { where: { id: user[0].id } });
      res.send({ accessBearerToken, username });
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('Username already exists');
      } else {
        next(err);
      }
    }
  });

  app.post('/api/me', async (req, res) => {
    const { username } = req;
    const user = await User.findOrCreate({ where: { username } });
    const { accessBearerToken } = user;
    return accessBearerToken;
  });

  app.post('/api/create', create, (req, res, next) => {
    try {
      const { id, gender } = req.patient;
      Patient.create({ patientId: id, gender });
      res.send({ patient: req.body });
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/everything', getEverything, (req, res, next) => {
    try {
      const { patient } = req;
      res.send({ patient });
    } catch (err) {
      next(err);
    }
  });

  app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // error handling
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
  await sessionStore.sync();
  await syncDb();
  createApp();
  startListening();
}

startApp();
