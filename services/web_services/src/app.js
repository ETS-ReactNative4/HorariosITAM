const express = require('express');
const bodyParser = require('body-parser');
const routesStudent = require('./routes/student');

const app = express();

app.use(bodyParser.json());
app.use('/student', routesStudent);

app.listen(process.env.USERS_PORT, () => console.log('App listening on port ' + process.env.USERS_PORT + '!'))
