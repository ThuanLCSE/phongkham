var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doctorSchema = new Schema({
  	fullname : String,
	username : String,
  	password: String
});
var Doctor = mongoose.model('doctor',doctorSchema);

// var newDoctor = new Doctor({
// 	fullname : 'LUONG CONG DUC',
// 	username : 'bacsiDuc',
//   	password: 'ringking'
// });
// newDoctor.save(function (err, doctor) {
//   if (err) {
//   	console.log(err);
// 	} else  {
// 		console.log(doctor);
// 	}
// }) 

module.exports = Doctor;