var BookingTime = require('./../models/bookingTime.js');
var errorHandler = require('./error.handle.ctrl');

exports.create = function(req,res){
	var newBookingTime = new BookingTime(req.body.user); 

  	newBookingTime.save(function(err, time) {
    if (err) {
      return res.status(400).send({ 
  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      res.status(200).send(time);
    }
  });
};

exports.createWeekDayShift = function(req,res){
  var newMorningShift = req.body.morningShift?req.body.morningShift:null;
  var newNightShift = req.body.nightShift?req.body.nightShift:null;
  console.log(newMorningShift);
  var bookingDayId = req.body.weekDayId;
  BookingTime.findById(bookingDayId).exec(
  function(err, currentBookingTime) {
        if (!currentBookingTime) {
            return res.status(400).send({
                message: 'Cannot find day by id'
            });
        } else { 
          currentBookingTime.morningShift = newMorningShift;
          currentBookingTime.nightShift = newNightShift;
           
            currentBookingTime.save(function(err, newBookingTime) {
                if (err) { 
                    return res.status(400).send({
                        message: err
                    });
                } else {
                    return res.status(200).send({
                      message: 'create success',
                      weekDay: newBookingTime
                    });
                }
            });
        }
    });
};
exports.edit = function(req,res){
	var updatedData = req.body.bookingTime;

	BookingTime.findById(updatedData.id).exec(
 	function(err, currentBookingTime) {
        if (!currentBookingTime) {
            return res.status(400).send({
                message: 'Cannot find time by id'
            });
        } else { 
        	currentBookingTime.morningShift = updatedData.morningShift;
        	currentBookingTime.nightShift = updatedData.nightShift;
        	 
            currentBookingTime.save(function(err, newBookingTime) {
                if (err) {
                    // If an error occurs send the error message
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    return res.status(200).send(newBookingTime);
                }
            });
        }
    });
};
exports.removeShift = function(req,res){
	var weekDayId = req.body.bookingTime.id;
	var removeShiftType = req.body.shiftType;
	BookingTime.findById(weekDayId, function (err, currentBookingTime) {
   		 if (err) {
	 		return res.status(400).send({
	            message: errorHandler.getErrorMessage(err)
	        });
	    }
    	currentBookingTime.remove(function (err) {
		    if (err) {
		 		return res.status(400).send({
		            message: errorHandler.getErrorMessage(err)
		        });
		    } else {
          return res.status(200).send({
                message: "remove success"
            });
        }
		})
	});
};
exports.getAll = function(req,res){
	BookingTime.find(function(err, times) {
	    if (err) {
	      return res.status(400).send({ 
	  				message: errorHandler.getErrorMessage(err)
	  			});
	    } else {
	      res.status(200).send(times);
	    }
	  });
}; 
exports.getNearestShift = function(req,res){

   BookingTime.find(function(err, times) {
        if (err) {
          return res.status(400).send(errorHandler.getErrorMessage(err)
            );
        } else {
          
          var day = new Date();
           var weekDay = day.getDay();
           var bookTime = day.getHours() + (day.getMinutes()/60);
          
           var nearestShift = {};
              if (times[weekDay].morningShift !== null &&
                  bookTime < times[weekDay].morningShift.start){
                    nearestShift.morningShift = times[weekDay].morningShift; 
              } else
              if (times[weekDay].nightShift !== null &&
                  bookTime < times[weekDay].nightShift.start){
                     nearestShift.nightShift = times[weekDay].nightShift;  
              }
              
            if (!nearestShift.morningShift && !nearestShift.nightShift){ 
              weekDay++;
              var count = 0;
                for (; ;weekDay++){
                  count++;
                 if (weekDay === 7) {
                    weekDay = 0;
                  }
                  var nextDay = times[weekDay];
                  if (nextDay.morningShift && nextDay.morningShift.start){
                    nearestShift.morningShift = nextDay.morningShift;  
                    nearestShift.weekDay = nextDay.weekDay;
                    break;
                  } else 
                  if (nextDay.nightShift && nextDay.nightShift.start){
                    nearestShift.nightShift = nextDay.nightShift;  
                    nearestShift.weekDay = nextDay.weekDay;
                    break;
                  } 
                  if (count >= 20){
                    break;
                  }
              }
           } else {
            nearestShift.weekDay = times[weekDay].weekDay;
           }
           nearestShift.weekDayNumber = weekDay;
           res.status(200).send({
              shift: nearestShift
            }); 

        }
      });
}