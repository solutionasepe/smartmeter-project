require('dotenv').config();

//connecting to mongoose database
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.DATABASE_URL;

main().catch((err) => console.log(err));
async function main(){
  const conn = mongoose.connect(mongoDB);
}


const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const debug = require('debug')('smartmeter-project:server');


const app = express();

//set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const indexRoutes = require('./routes/index');
// const appRoutes = require('./routes/appRoutes');
const { Server } = require("http");


//Using the Routes 
app.use('/index', indexRoutes);
// app.use('/api', appRoutes);

//starting the server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`server runnning on ${PORT}`));

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  module.exports = Server