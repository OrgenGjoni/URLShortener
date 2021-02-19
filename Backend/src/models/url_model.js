const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Url = new Schema({
  url : {type : String, required : true},
  id : {type : Number, required : true}
},{collection : 'url_collection'});

module.exports = mongoose.model('urls',Url);
