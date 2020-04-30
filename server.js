const path = require('path');
const express = require('express');

const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.get('/', (req, res) => res.send('HELLO FROM EXPRESS AND THE STARTING BOILERPLATE'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.listen(3000, () => console.log('App listening on port 3000!'));
