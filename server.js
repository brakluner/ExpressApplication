var express = require("express");
var path = require("path");
var fs = require("fs");



var app = express();
var PORT = 4400;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public')); 


//let rawdata = fs.readFileSync('db.json');
//let Notes = JSON.parse(rawdata);
var NotesData = require("./db.json")
//console.log(Notes);
console.log(NotesData);


  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
  
  app.get('/index.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'assets/js/index.js'));
});

app.get('/styles.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'assets/css/styles.css'));
});

app.get('/db.json', function (req, res) {
    res.sendFile(path.join(__dirname, 'db.json'));
});


app.get("/api/Note", function(req, res) {
    return res.json(NotesData);
  });

app.get("/api/Note/:id", function(req, res) {
  let chosen = req.params.id;

  console.log(chosen);
  

  for (var i = 0; i < NotesData.length; i++) {
    if (chosen === NotesData[i].id) {
      return res.json(NotesData[i]);
    }console.log(NotesData[i].id)
  }
  
});

app.post("/api/Note", function(req, res) {
    
    let newNote = req.body;
    let newId = parseInt(NotesData[NotesData.length-1].id)+1;
    let stringId = newId.toString();
      NotesData.push({
         NoteText: req.body.NoteText,
         NoteTitle: req.body.NoteTitle,
         id: stringId
      });
      

  
    // We then add the json the user sent to the character array
    console.log(NotesData)
    
    // We then display the JSON to the users
    res.json(newNote);

    let data = JSON.stringify(NotesData);
    fs.writeFileSync('db.json', data);
    
});

  app.delete('/api/Note/:id', function(req, res) {

    let rooot = req.url

    console.log(rooot);

    fs.unlink(rooot, (err) => {
        if (err) throw err;
      });
    res.send("wallah");


    //let chosen = req.params.id;

    // console.log(res);

    // for (var i = 0; i < NotesData.length; i++) {
    //     if (chosen === NotesData[i].id) {
    //       return res.json();
    //     }console.log(res)
      
    //   let data = JSON.stringify(NotesData[i]);
    //   console.log(data)
    //   fs.writeFileSync("db.json", data, {  
    //     encoding: "utf8",  
    //     mode: 666,  
    //     flag: "w"
          
    //   });
      //console.log(data)
      
        //     };
    
  
         })
    

  

  
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });