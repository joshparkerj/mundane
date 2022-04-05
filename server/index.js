require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const massive = require('massive');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const debug = require('debug');

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

const debugServerIndex = debug('server-index');

massive(process.env.dataBase)
  .then((db) => {
    app.set('db', db);
    debugServerIndex('connected to database');
    configureSession(app, db);
    app.use('/api', routes);
    app.listen(8080, () => debugServerIndex('listening on 8080'));
  })
  .catch((error) => debugServerIndex(error));
