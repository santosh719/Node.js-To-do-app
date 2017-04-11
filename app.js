//import required modules
var express = require('express');
var todoController = require('./controllers/todoController');

//initiliaze express
var app = express();

//setting up template engine
app.set('view engine', 'ejs');

//initiliaze static files
app.use(express.static('./public'));

//invoke controllers
todoController(app);

//start listening to port
app.listen(3000);
console.log("server started on port 3000");
