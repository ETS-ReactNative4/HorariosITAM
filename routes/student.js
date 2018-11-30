const express = require('express')
const router = express.Router();
var pgp = require('pg-promise')({
  /* initialization options */
  capSQL: true // capitalize all generated SQL
});

var database_url = 'postgres://yjxmxmdcuhhkqm:3ace012f4774e98479d3ad0819355992a136834c24a8010feeed1f682fddb20a@ec2-54-83-8-246.compute-1.amazonaws.com:5432/db6fg3ucd43k2l';
//var database_url = 'postgres://postgres:postgres@localhost:5432/incol';
const db = pgp(database_url);

router.get('/ping', function (req, res){
  res.status(200).send('pong');
});

router.post('/login', function(req, res){
  var cu = req.body.cu;
  var pw = req.body.pw;


  db.oneOrNone('SELECT CU FROM alumnos WHERE CU = $1 AND password = $2', [cu, pw])
    .then(function (data) {
      if(data!=null){
        res.status(200);
        console.log("BUENA");
        res.json(data);
      }
      else{
        res.status(400);
        console.log("MALA");
        res.json({});
      }
    //res.send('<h2>Todo en orden</h2>');
    })
    .catch(function (error) {
      res.status(400);
      console.log(error);
      console.log("MALA");
      res.send('<h2>Hubo un error</h2>');
    })
});

router.post('/no', function(req, res){
  var cu = req.body.cu;

  db.task(t => {
    return t.any('SELECT materia.id_Mat FROM materia, cursado WHERE cursado.CU=$1 AND materia.id_Mat=cursado.id_Mat', cu)
      .then(data => {
        return t.many('SELECT materia.id_Mat FROM planEstudios, materia WHERE materia.id_Mat=planEstudios.id_Mat AND materia.id_Mat NOT IN ($1:csv)', data)
      })
  })
  .then(data => {
    res.status(200);
    console.log("BUENA");
    res.json(data);
  })
  .catch(error => {
    res.status(400);
    console.log("MALA");
    console.log(error);
  });



});

router.get('/info', function(req, res){
  db.many('SELECT * FROM alumnos')
    .then(function (data) {
      res.status(200);
      console.log("BUENA");
      res.json(data);
    })
    .catch(function (error) {
      res.status(400);
      console.log(error);
      console.log("MALA");
    })
});


module.exports = router