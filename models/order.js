var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'customer'},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'product'}
})

module.exports = mongoose.model('order', orderSchema);