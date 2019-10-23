const express = require('express');

const app = express();

const port = 3000;

let i = 1;

app.get('/', (req, res) => {
    res.send(`${i}`);
    i++;
});

app.listen(port, () => console.log(
    `App listening on port ${port}`
));