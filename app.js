const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routesStudent = require('./routes/student');

const app = express()

app.use(express.static(path.join(__dirname, 'web/build')));
app.use(bodyParser.json());
app.use('/student', routesStudent);

var port = process.env.PORT || 3001;

app.get('*', function (req, res) {
    const index = path.join(__dirname, 'build', 'index.html');
    res.sendFile(index);
  });

app.listen(port, () => console.log('App listening on port ' + port + '!'))
