var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var User = new Schema({id:ObjectId,login:String,password:String})
mongoose.model('User',User)

