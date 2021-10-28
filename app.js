var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var storeRouter = require('./routes/stores');
var categoryRouter = require('./routes/category');
var shapeRouter = require('./routes/shape');
var frametypeRouter = require('./routes/frametype');
var colorRouter = require('./routes/color');
var materialRouter = require('./routes/material');
var priceRouter = require('./routes/price');
var adminRouter = require('./routes/admin');
var productRouter = require('./routes/product')
var finalProductRouter = require('./routes/finalproduct');
var homePagePictureRouter = require('./routes/HomePagePicture');
var userDetailRouter = require('./routes/userDetails');
var smsapiRouter = require('./routes/smsapi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stores',storeRouter);
app.use('/category',categoryRouter);
app.use('/shape', shapeRouter);
app.use('/frametype' , frametypeRouter);
app.use('/color',colorRouter);
app.use('/material' , materialRouter);
app.use('/price' , priceRouter);
app.use('/admin' , adminRouter);
app.use('/product',productRouter);
app.use('/finalproduct',finalProductRouter);
app.use('/homePagePicture',homePagePictureRouter);
app.use('/userDetails',userDetailRouter);
app.use('/sendsms',smsapiRouter);

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
