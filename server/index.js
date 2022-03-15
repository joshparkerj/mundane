require ('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const massive = require('massive');
const bodyParser = require('body-parser');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger('tiny'));
app.use(rateLimit({
  windowMs: 500,
  max: 5,
  legacyHeaders: false,
  standardHeaders: true,
}));

massive (process.env.dataBase)
  .then( db => {
    app.set ('db',db)
    console.log('connected to database')
    require('./configure/session')(app,db)
    app.use('/api' , require('./routes'))
    app.listen(8080, () => console.log('listening on 8080'))
  })
  .catch (error => console.error(error));
