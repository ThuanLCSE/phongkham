var Doctor = require('./../models/doctor.js');
var errorHandler = require('./error.handle.ctrl');

exports.signIn = function(req,res){
	var data = {};
	data.username = req.body.username;
	data.password = req.body.password;
  	Doctor.findOne({ 
  		username: data.username,
  		password: data.password
  	 }, function (err, doctor) {
	  if (err) {
	  	res.status(400).send({
	  			message: errorHandler.getErrorMessage(err)
  			});
	  } else if (doctor === null) {
 		res.status(400).send('not auth');
	  } else {
	  	var newSession = req.session;
			var authenticatedDoctor = {
				id : doctor._id,
				fullname : doctor.fullname
			};
			newSession.doctor = authenticatedDoctor;
	  	res.status(200).send(authenticatedDoctor);
	  }
  });
};

exports.checkAuth = function(req,res,next){  
  	 if (req.session.doctor) {
		if (!next) {
			return res.status(200).send({
				message: 'session in',
				doctor: req.session.doctor
			});
		} else 
		next();
	} else {
		return res.status(401).send({
			message: 'user out'
		});
	}
};


exports.signout = function(req,res){
	req.session.doctor = undefined;
	if (req.session.doctor === undefined) {
		return res.status(200).send({
			message: 'user out'
		});
	} else {
		return res.status(400).send({
			message: 'failed out'
		});
	}
};