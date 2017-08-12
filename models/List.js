const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ListSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'ListItem'
    }]
});

const List = mongoose.model('List', ListSchema);

module.exports = List;