const bodyParser = require('body-parser');

const urlencodeParser = bodyParser.urlencoded({extended: false});

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo');

let todoSchema = new mongoose.Schema({
  item: String
});

let Todo = mongoose.model('Todo', todoSchema);

/*
let data = [
  {item: 'get milk'},
  {item: 'walk dog'},
  {item: 'make dinner'}
]; */

module.exports = function(app) {
  app.get('/todo', (req, res) => {
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodeParser, (req, res) => {
    let itemOne = Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
      console.log('item saved');
    });
    
  });

  app.delete('/todo/:item', (req, res) => {   
    /* data = data.filter(todo => {
      return todo.item.replace(/ /g, "-") !== req.params.item;
    });
    res.json(data); */
    Todo.find({item: req.params.item.replace(/-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
}