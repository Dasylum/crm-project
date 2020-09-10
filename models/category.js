var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model('category', categorySchema);