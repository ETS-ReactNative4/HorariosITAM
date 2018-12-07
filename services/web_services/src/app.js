const express = require('express');
const bodyParser = require('body-parser');
const routesStudent = require('./routes/student');

const cors = require('cors');
const app = express();

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use('/student', routesStudent);

app.listen(process.env.USERS_PORT, () => console.log('App listening on port ' + process.env.USERS_PORT + '!'))
