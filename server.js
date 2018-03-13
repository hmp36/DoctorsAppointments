const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 8001;
const app = express();

app.use(bodyParser.json());
app.use(session({ secret: "Invictus"}));
app.use(express.static(__dirname + '/client/dist'));

require("./server/utils/mongoose");
require("./server/utils/routes")(app);

app.listen(port, () => {
    console.log(`Hey, you are on port ${port}`)
});