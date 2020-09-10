var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: {type: String, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true},
    price: {type: String, required: true},
    quantity: {type: Number, required: true}
})

module.exports = mongoose.model('product', productSchema);