const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const morgan = require('morgan');

const authenticate = require('./middleware/authenticate');

app.use(morgan('dev'));

app.use(bodyParser);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.get('/', (req, res) => {
  res.send('the first login page is working');
});

app.get('/login', authenticate);

app.listen(3000, () => console.log('App listening on port 3000!'));
