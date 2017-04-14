var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/recipes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connect mongoose");
});

var Recipe = mongoose.model("Recipe", {
  title: String,
  ingredients: String,
  id: Number
});

app.use(bodyParser.urlencoded({ extended: true }));

// GET FROM DATABASE
app.get("/recipes", function(req, res) {
  Recipe.find({}, function(err, results) {
    res.status(200).json(results);
  });
});

//ADD NEW
app.post("/new", function(req, res) {
  db.collection("recipes").insert(req.body, function(err, results) {
    console.log("results", results);
    res.status(200).json(results);
  });
});

//UPDATE
app.get('/update/:recipeId', function(req, res) {
  Task.findById(req.params.recipeId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
})

app.put("/update/:recipeId", function(req, res) {
  console.log("Inside put route: ", JSON.stringify(req.body));
  Recipe.findByIdAndUpdate(req.params.recipeId, req.body, {new: true}, function(err, updatedRecipe) {
    console.log("updatedRecipe", updatedRecipe);
    if (err)
       res.send(err);
      res.json(updatedRecipe);
  });
});

//DELETE
app.delete("/update/:recipeId", function(req, res) {
  Recipe.remove({
    _id: req.params.recipeId
  }, function(err, recipe) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
});

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
