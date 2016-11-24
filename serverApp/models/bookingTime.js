var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 

var bookingTimeSchema = new Schema({
	weekDay : String,
  	morningShift: {
  		start: {
	  		type : Number,
	  		require : "start time require"
	  	},
	  	end : {
	  		type : Number,
	  		require : "start time require"
	  	}
  	},
	nightShift: {
  		start: {
	  		type : Number,
	  		require : "start time require"
	  	},
	  	end : {
	  		type : Number,
	  		require : "start time require"
	  	}
  	},
});
var Booking = mongoose.model('bookingTime',bookingTimeSchema);

// var sunday = new Booking({
// 	weekDay : 'Chủ nhật'
// });
// sunday.save(function (err, day) {
//   if (err) {
//   	console.log(err);
// 	} else  {
// 		console.log(day);
// 	}
// });
// var monday = new Booking({
// 	weekDay : 'Thứ hai'
// });
// monday.save(function (err, day) {
//   if (err) {
//   	console.log(err);
// 	} else  {
// 		console.log(day);
// 	}
// });
// var tuesday = new Booking({
// 	weekDay : 'Thứ ba'
// });
// tuesday.save(function (err, day) {
//   if (err) {
//   	console.log(err);
// 	} else  {
// 		console.log(day);
// 	}
// });
// var wwedday = new Booking({
// 	weekDay : 'Thứ tư'
// });
// wwedday.save(function (err, day) {
//   if (err) {
//   	console.log(err);
// 	} else  {
// 		console.log(day);
// 	}
// });
// tuesday = new Booking({
// 	weekDay : 'Thứ năm'
// });
// tuesday.save(function (err, day) {
//   if (err) {
//   	console.log(err);
// 	} else  {
// 		console.log(day);
// 	}
// });
//  tuesday = new Booking({
// 	weekDay : 'Thứ sáu'
// });
// tuesday.save(function (err, day) {
//   if (err) {
//   	console.log(err);
// 	} else  {
// 		console.log(day);
// 	}
// });
//  tuesday = new Booking({
// 	weekDay : 'Thứ bảy'
// });
// tuesday.save(function (err, day) {
//   if (err) {
//   	console.log(err);
// 	} else  {
// 		console.log(day);
// 	}
// });


 
module.exports = Booking;