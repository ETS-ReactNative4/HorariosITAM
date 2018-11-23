const express = require('express')
const router = express.Router();
var pgp = require('pg-promise')({
  /* initialization options */
  capSQL: true // capitalize all generated SQL
});

var database_url = 'postgres://yjxmxmdcuhhkqm:3ace012f4774e98479d3ad0819355992a136834c24a8010feeed1f682fddb20a@ec2-54-83-8-246.compute-1.amazonaws.com:5432/db6fg3ucd43k2l';
const db = pgp(database_url);

router.get('/ping', function (req, res){
  res.status(200).send('pong');
});

router.get('/info', function(req, res){
  db.one('SELECT * FROM alumnos')
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