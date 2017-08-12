const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ListItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    }
});

const ListItem = mongoose.model('ListItem', ListItemSchema);

module.exports = ListItem;