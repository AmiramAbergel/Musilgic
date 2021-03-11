const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const port = 5000;
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req,res) => res.send("Hello World"));
//app.get("/index1.js", (req,res) => res.send("index1.js"));
app.get("/nirsapplication", (req,res) => res.send("This is nirs app bitch!"));

let game;
let name;
let age;
let timeToFinish;
let dragCount;
let totalFlips;


var schema = mongoose.Schema({
    game: String,
    name: String,
    age: Number,
    timeToFinish: Number,
    dragCount: Number,
    totalFlips: Number
  });

app.post('/game-success', (req, res) => {
game = req.body.game;
name =req.body.firstName;
age = req.body.age;
timeToFinish = req.body.timeToFinish;
dragCount = req.body.dragCount;
totalFlips = req.body.totalFlips;

    console.log('got stuff', game + " " + name + " " + age + " " + timeToFinish + " " + dragCount + " " + totalFlips);


      
      var Model = mongoose.model("model", schema, "GoldenAgeApp");


    var doc1 = new Model({ game: game , name: name, age: age, timeToFinish: timeToFinish, dragCount: dragCount, totalFlips: totalFlips });

    doc1.save(function(err, doc) {
        if (err) return console.error(err);
        console.log("Document inserted succussfully!");
      });


    res.sendStatus(200);
});



app.listen(port, () => console.log(' example listining on port 5000'));



const dbURI = 'mongodb+srv://nyosef:test1234@cluster0.gq7xq.mongodb.net/node-tuts?retryWrites=true&w=majority';
// second argument stops deprecation warning


mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology: true})
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err));