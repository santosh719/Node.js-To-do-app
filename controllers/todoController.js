var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://test:test@ds159220.mlab.com:59220/todo-santosh');

//create a schema for mongodb
var todoSchema = new mongoose.Schema({
    item: String
});

//create model
var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item:'eat breakfast'}).save(function(err){
//   if(err) throw err;
//   console.log('item saved');
// });

// var data = [{
//     'item': 'get milk'
// }, {
//     'item': 'complete assignments'
// }, {
//     'item': 'do some coding'
// }];
var urlencoder = bodyParser.urlencoded({
    extended: false
});

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        //get data from mongodb
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', {
                todos: data
            });
        });
    });
    app.post('/todo', urlencoder, function(req, res) {
        // get data from view and add to mongodb
        var newTodo = Todo(req.body).save(function(err,data) {
            if (err) throw err;
            res.json(data);
        });
        //data.push(req.body);

    });
    app.delete('/todo/:item', function(req, res) {
        //delete from mongodb as well as the view
        Todo.find({
            item: req.params.item.replace(/\-/g, " ")
        }).remove(function(err,data) {
            if (err) throw err;
            res.json(data);
        });
        // data = data.filter(function(todo){
        //   return todo.item.replace(/ /g, '-') !==  req.params.item;
        // });
        // res.json(data);
    });
};
