const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Risk = new Schema({
    loc: {
        type: String
    },
    severity: {
        type: String
    },
    media: {
        type: String
    }
}, {
    collection: 'Risk'
});

module.exports = mongoose.model('Risk', Risk);