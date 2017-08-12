const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    facebook_id: {
        type: String,
        required: true,
        unique: true
    },
    lists: [{
        type: Schema.Types.ObjectId,
        ref: 'List'
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;