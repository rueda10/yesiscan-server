const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbRoutes = require('./routes/dbRoutes.js');
const db = require('./models');

mongoose.Promise = Promise;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use("/", dbRoutes);

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function () {
        console.log("App listening on port: " + PORT);
    });
});