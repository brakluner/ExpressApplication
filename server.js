var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = 4400;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public')); 

// var Notes = [
//     {
//       NoteTitle: "Christina",
//       NoteText: "Chrissy"
//     },
//     {
//       NoteTitle: "Ricci",
//       NoteText: "Wednesday"
//     },
//     {
//       NoteTitle: "Raul",
//       NoteText: "Gomez"
//     },
//   ];

let rawdata = fs.readFileSync('db.json');
let Notes = JSON.parse(rawdata);
var NotesData = require("./db.json")
console.log(Notes);
console.log(NotesData);

//   fs.readFile(__dirname + "db.json", function(err, data) {
//     if (err) throw err;
    
//     res.writeHead(200, { "Content-Type": "json" });
//     res.end(data);
//   });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
  
  app.get('/index.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'assets/js/index.js'));
});

app.get("/api/Note", function(req, res) {
    res.json(NotesData);
  });

app.post("/api/Note", function(req, res) {
    
    var newNote = req.body;

    console.log(newNote);
  
    // We then add the json the user sent to the character array
    NotesData.push(newNote);
    console.log(NotesData)
    
    // We then display the JSON to the users
    res.json(newNote);
    console.log(res)
  });

  app.delete('/delete/:Note', function(req, res) {
    var id = req.param("Note");
        MyModel.remove({
            _id: id 
        }, function(err){
            if (err) {
                console.log(err)
            }
            else {
               return res.send("Removed");
            }
        });
    });
  
    
    

  

  
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });