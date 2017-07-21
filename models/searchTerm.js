const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchTermSchema = new Schema(
  {
    searchVal: String,
    searchDate: Date
  },
  {timestamps: true}
);

//connect model and collection
const ModelClass = mongoose.model('searchTerm', searchTermSchema);
module.exports = ModelClass;