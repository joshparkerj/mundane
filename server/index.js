require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const massive = require('massive');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const configureSession = require('./configure/session');
const routes = require('./routes');

const app = express();

app.use(rateLimit({
  windowMs: 500,
  max: 5,
  legacyHeaders: false,
  standardHeaders: true,
}));

app.use(cors());
app.use(bodyParser.json());
app.use(logger('tiny'));

massive(process.env.dataBase)
  .then((db) => {
    app.set('db', db);
    console.log('connected to database');
    configureSession(app, db);
    app.use('/api', routes);
    app.listen(8080, () => console.log('listening on 8080'));
  })
  .catch((error) => console.error(error));
