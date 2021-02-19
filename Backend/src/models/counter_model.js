const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);
const Counter = new Schema({
  id : {type : Number, default : 0 ,required : true}
},{collection : 'counter'});

module.exports = mongoose.model('counter',Counter);
