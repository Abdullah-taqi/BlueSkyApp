const mongoose = require('mongoose')
const DataSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    country_or_area: String,
    year: Number,
    value: Number,
    category: String

}, {
    collection: 'BlueSky'
});

module.exports = mongoose.model('Data', DataSchema)

