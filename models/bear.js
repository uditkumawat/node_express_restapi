'use strict';

let mongoose = require('mongoose');

let Schema   = mongoose.Schema;

let bearSchema = new Schema({
	name:String
},{versionKey:false},{collection:'bear'});

let Bear = mongoose.model('Bear',bearSchema);

module.exports = Bear;


