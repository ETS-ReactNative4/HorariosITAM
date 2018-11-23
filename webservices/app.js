const express = require('express')
const bodyParser = require('body-parser');
const routesStudent = require('./routes/student');

const app = express()

app.use(bodyParser.json());
app.use('/student', routesStudent);

var port = process.env.PORT || 3001;

app.listen(port, () => console.log('App listening on port ' + port + '!'))
