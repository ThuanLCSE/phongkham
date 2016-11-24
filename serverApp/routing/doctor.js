module.exports = function(app){
	var doctorCtrler = require('../controller/doctor.ctrl');
	var bookingTimeCtrler = require('../controller/bookingTime.ctrl');
	var userCtrler = require('../controller/user.ctrl');
	app.route('/api/doctor/signIn').post(doctorCtrler.signIn);
	app.route('/api/doctor/checkAuth').get(doctorCtrler.checkAuth);
	app.route('/api/doctor/signOut').get(doctorCtrler.signout);
	app.route('/api/user/list').get(doctorCtrler.checkAuth, userCtrler.getListUser);
	app.route('/api/user/remove').post(doctorCtrler.checkAuth, userCtrler.removeBookigById);
	app.route('/api/user/removeAll').get(doctorCtrler.checkAuth,userCtrler.removeAllUser);
	app.route('/api/time/list').get(doctorCtrler.checkAuth, bookingTimeCtrler.getAll);
	app.route('/api/time/shift/create').post(doctorCtrler.checkAuth, bookingTimeCtrler.createWeekDayShift);
}