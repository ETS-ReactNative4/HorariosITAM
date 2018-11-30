const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routesStudent = require('./routes/student');

const app = express()

app.use(express.static(path.join(__dirname, 'web/build')));
app.use(bodyParser.json());
app.use('/student', routesStudent);

var port = process.env.PORT || 3001;

app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'web', 'build', 'index.html'));
});

app.listen(port, () => console.log('App listening on port ' + port + '!'))
