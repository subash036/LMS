// app/models/bear.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	username: {
		type: String
			//		, required: true
			//		, index: {
			//			unique: true
			//		}
	}
	, password: {
		type: String
			//		, required: true
	}
	, firstname: {
		type: String
			//		, required: true
	}
	, lasttname: {
		type: String
			//		, required: true
	}
});
module.exports = mongoose.model('UserSchema', UserSchema);