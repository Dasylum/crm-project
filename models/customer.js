var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    memberStatus: {type: Boolean, required: true}
})

module.exports = mongoose.model('customer', customerSchema);