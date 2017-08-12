const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbRoutes = require('./routes/dbRoutes.js');

mongoose.Promise = Promise;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect("mongodb://localhost/yesiscan");
}
const db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

app.use("/", dbRoutes);

app.listen(PORT, function() {
   console.log("App listening on port: " + PORT);
});