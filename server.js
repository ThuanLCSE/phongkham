process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('babel-register')({
        "presets": ["es2015", "react"]
});

var mongoose = require('./config/mongoose'),
	express = require('./config/express');

var mongo_db = mongoose();

var server = express(mongo_db);

server.listen(process.env.PORT || 8080);
console.log('-----Server running at http://localhost:3013/ ------'); 
module.exports = server;