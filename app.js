var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bike = require("./models/bike"); 


require('dotenv').config(); 
const connectionString =  
process.env.MONGO_CON 
mongoose = require('mongoose'); 
mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true}); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bikeRouter = require('./routes/bike');
var gridbuildRouter = require('./routes/gridbuild');
var selectordRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bike', bikeRouter);
app.use('/gridbuild', gridbuildRouter);
app.use('/selector', selectordRouter);
app.use('/resource', resourceRouter);

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


async function recreateDB(){ 
  // Delete everything 
  await bike.deleteMany(); 
 
  let instance1 = new 
bike({bike_type:"single exhaust",  model:'R15', cost:25}); 
  instance1.save( function(err,doc) { 
      if(err) return console.error(err); 
      console.log("First object saved") 
  }); 

  let instance2 = new bike({bike_type:"dual exhaust",  model:'Passion', cost:15}); 
    instance2.save( function(err,doc) { 
        if(err) return console.error(err); 
        console.log("Second object saved") 
    }); 

    let instance3 = new bike({bike_type:"triple exhaust",  model:'Splendor', cost:25}); 
      instance3.save( function(err,doc) { 
          if(err) return console.error(err); 
          console.log("Third object saved") 
      }); 
} 
 
let reseed = true; 
if (reseed) { recreateDB();} 
 

module.exports = app;
