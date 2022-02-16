var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


require('dotenv').config();
var session = require('express-session');
var fileUpload = require('express-fileupload');


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/admin/login');
var obrasRouter = require('./routes/admin/obras');
var cursosRouter = require('./routes/admin/cursos');
var teatrosRouter = require('./routes/admin/teatros');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Sesiones 
var random_string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
app.use(session ({
  secret: random_string, 
  resave: false, 
  saveUninitialized: true
}));

secured = async (req, res, next) => {
  try {
    console.log('Id usuario ' + req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.log(error);
  }
}
// Fin sesiones

app.use('/', indexRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/obras', secured, obrasRouter);
app.use('/admin/cursos', secured, cursosRouter);
app.use('/admin/teatros', secured, teatrosRouter);
app.use('/api', cors(), apiRouter);


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
