const path = require('path');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const morgan = require('morgan');
const db = require('./db');

const sessionStore = new SequelizeStore({ db });
const { User, Patient } = require('./db/models');

const PORT = process.env.PORT || 3000;
const authenticate = require('./middleware/authenticate');
const { create, getEverything } = require('./middleware/patient');

require('../secrets');

// serialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize User
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (async (username, password, done) => {
      await db.models.user.findOne(
        {
          where: {
            username,
          },
        },
        (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        },
      );
    }),
  ),
);

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (async (req, username, password, done) => {
      // find a user whose username is the same as the forms username
      // we are checking to see if the user trying to login already exists
      await db.models.user.findOne(
        {
          where: {
            username,
          },
        },
        (err, user) => {
          // if there are any errors, return the error
          if (err || !user) return done(err);

          // check to see if theres already a user with that username
          return done(
            null,
            false,
            req.flash('signupMessage', 'That username is already taken.'),
          );
        },
      );
    }),
  ),
);

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // session middleware with passport
  app.use(
    session({
      secret: 'secret',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // app.get('/', authenticate);

  app.get('/login', authenticate, async (req, res, next) => {
    try {
      const { accessBearerToken } = req;
      const user = await User.findOrCreate({ where: { username: 'hannah' } });
      User.update({ accessBearerToken }, { where: { id: user[0].id } });
      req.login(user, (err) => (err ? next(err) : res.json(user)));
      res.send({ accessBearerToken });
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('Username already exists');
      } else {
        next(err);
      }
    }
  });

  app.get('/create', create, async (req, res, next) => {
    try {
      const { id, gender } = req.patient;
      Patient.create({ patientId: id, gender });
    } catch (err) {
      next(err);
    }
  });

  app.get('/everything', getEverything, async (req, res, next) => {
    try {
      res.send(req.patient);
      next();
    } catch (err) {
      console.log(err);
    }
  });

  app.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  });

  app.get('/me', (req, res) => {
    res.json(req.user || {});
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
