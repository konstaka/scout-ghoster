require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const checkToken = require('./util/auth');

// database
mongoose.connect(process.env.DB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000
});
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database error: '));
db.once('open', () => {
  console.log('Database connected');
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS for local dev support as Vue dev server has a different port
console.log('Running in ' + process.env.NODE_ENV + ' mode');
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

// Vue frontend
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// authentication middleware before accessing other routes
app.use(checkToken);

// routes
const settingsRouter = require('./routes/settings');
const operationMetaRouter = require('./routes/operationMeta');
const targetsRouter = require('./routes/targets');
const attackersRouter = require('./routes/attackers');
const scoutsRouter = require('./routes/scouts');
const ghostsRouter = require('./routes/ghosts');
const mapSqlRouter = require('./routes/mapSql');
app.use('/settings', settingsRouter);
app.use('/operationMeta', operationMetaRouter);
app.use('/targets', targetsRouter);
app.use('/attackers', attackersRouter);
app.use('/scouts', scoutsRouter);
app.use('/ghosts', ghostsRouter);
app.use('/mapSql', mapSqlRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
