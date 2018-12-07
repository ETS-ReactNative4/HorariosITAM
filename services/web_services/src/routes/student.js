const express = require('express')
const router = express.Router();
var pgp = require('pg-promise')({
  /* initialization options */
  capSQL: true // capitalize all generated SQL
});


var database_url= process.env.DB_URL || 'postgres://postgres:postgres@localhost:5432/incol';
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

router.post('/no_cursadas', function(req, res){
  var cu = req.body.cu;
  var materias = req.body.materias;

  db.task(t => {
    return t.any('SELECT materia.id_Mat FROM materia, cursado WHERE cursado.CU=$1 AND materia.id_Mat=cursado.id_Mat', cu)
      .then(data => {
        console.log(data);
        var data_arr = Array();
        for(var i = 0; i<data.length; i++){
          data_arr.push(data[i].id_mat);
        } 
        console.log(data_arr)
        return t.any('SELECT materia.name, materia.id_Mat, prereq, optativa, contiene.ponderacion FROM planEstudios, materia, contiene  WHERE materia.id_Mat=contiene.id_Mat AND planEstudios.id_Plan=contiene.id_Plan AND materia.id_Mat NOT IN ($1:csv) ORDER BY contiene.ponderacion DESC limit $2', [data_arr, materias])
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

router.post('/grupos_abiertos', function(req, res){
  var cu = req.body.cu;
  var materias = req.body.materias;

  db.task(t => {
    return t.any('SELECT materia.id_Mat FROM materia, cursado WHERE cursado.CU=$1 AND materia.id_Mat=cursado.id_Mat', cu)
      .then(data => {
        console.log(data);
        var data_arr = Array();
        for(var i = 0; i<data.length; i++){
          data_arr.push(data[i].id_mat);
        } 
        console.log(data_arr)
        return t.any('SELECT materia.id_Mat FROM planEstudios, materia, contiene  WHERE materia.id_Mat=contiene.id_Mat AND planEstudios.id_Plan=contiene.id_Plan AND materia.id_Mat NOT IN ($1:csv) ORDER BY contiene.ponderacion DESC limit $2', [data_arr, materias])
          .then(data => {
            var data_ab = Array();
            for(var i = 0; i<data.length; i++){
              data_ab.push(data[i].id_mat);
            } 
            return t.any('SELECT * FROM grupo, materia, contiene WHERE materia.id_Mat=contiene.id_Mat AND grupo.id_Mat=contiene.id_Mat AND grupo.id_Mat IN ($1:csv)', [data_ab])
          })
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


router.get('/ping2', (req, res) => {
  res.status(200).send('éste sí jala');
})

module.exports = router
