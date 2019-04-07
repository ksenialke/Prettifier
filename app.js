const express = require('express');
const path = require('path');
const app = express();
const port = 4001;

app.use(express.static('static'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/main.html')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));