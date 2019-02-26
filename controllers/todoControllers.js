const bodyParser = require('body-parser');

const urlencodeParser = bodyParser.urlencoded({extended: false});

let data = [
  {item: 'get milk'},
  {item: 'walk dog'},
  {item: 'make dinner'}
];

module.exports = function(app) {
  app.get('/todo', (req, res) => {
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodeParser, (req, res) => {
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo/:item', (req, res) => {
    data = data.filter(todo => {
      return todo.item.replace(/ /g, "-") !== req.params.item;
    });
    res.json(data);
    // todo.find({item: req.params.item.replace(/-/g, " ")}).remove(function(err, data) {
    //   if (err) throw err;
    //   res.json(data);
    // });
  });
}