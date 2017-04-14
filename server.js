var express = require('express');
var app = express();
const bodyParser= require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/recipes');

app.use(bodyParser.json());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connect mongoose');
});

var Recipe = mongoose.model('Recipe', {
  title: String,
  ingredients: String,
  id: Number
});


// var rec = new Recipe({
//   title: 'Pancakes',
//   ingredients: 'Milk,Flour,Eggs',
//   id: 1
// });
//
// rec.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     //console.log('meow');
//   }
// });

app.use(bodyParser.urlencoded({extended: true}))

app.get('/recipes', function (req, res) {
Recipe.find({}, function(err, results){
  res.status(200).json(results);
})

});


app.post('/new', function(req, res){
  db.collection('recipes').insert(req.body, function(err, results){
    console.log('results', results);
    res.status(200).json(results);
  })
});

app.post('/update', function(req, res){
  console.log('Inside update route: ', req.body);
  db.collection('recipes').update({title: req.body.title}, req.body, function(err, results){
    res.status(200).json(results);
  })
});

app.post('/delete', function(req, res){
  db.collection('recipes').delete(req.body, function(err, results){
    console.log('results', results);
    res.status(200).json(results);
  })
});





app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});
