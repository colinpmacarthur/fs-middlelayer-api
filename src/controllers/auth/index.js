/*

  ___ ___       ___               _ _       _   ___ ___ 
 | __/ __|  ___| _ \___ _ _ _ __ (_) |_    /_\ | _ \_ _|
 | _|\__ \ / -_)  _/ -_) '_| '  \| |  _|  / _ \|  _/| | 
 |_| |___/ \___|_| \___|_| |_|_|_|_|\__| /_/ \_\_| |___|

*/

//*******************************************************************

'use strict';

//*******************************************************************
// required modules

const include = require('include')(__dirname);
const passport = require('passport');  
const Strategy = require('passport-local');
const bcrypt = require('bcrypt-nodejs');

const models = include('src/models');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

//*******************************************************************
// passport 

passport.use(new Strategy(  

	function(username, password, done) {
		
		models.users.findOne({
			where: {user_name: username} //eslint-disable-line camelcase
		}).then(function(user) {
			if (user){
				if (bcrypt.compareSync(password, user.pass_hash)){
					done(null, {
						id: user.user_name,
						role: user.user_role,
						verified: true
					});	
				}
				else {
					done(null, false);
				}
			}
			else {
				done(null, false);
			}
		}).catch(function (err) {
			console.error(err);
			done(null, false);
		});
	}
));

//*******************************************************************

/**
 * Serializes user info
 * @param  {Object}   req - Request object
 * @param  {Object}   res - Response object
 * @param  {Function} next - What to call after serializing user info
 */
const serialize = function(req, res, next) {  

	req.user = {
		id: req.user.id,
		role: req.user.role
	};
	next();
};

/**
 * Creates JWT to return to user
 * @param  {Object}   req - Request object
 * @param  {Object}   res - Response object
 * @param  {Function} next - What to call after creating JWT
 */
const generate = function(req, res, next) {   
	
	req.token = jwt.sign({
		id: req.user.id,
		role: req.user.role
	}, JWT_SECRET_KEY, { expiresIn: 120 * 60 });
	next();
};

/**
 * Responds to user request with token
 * @param  {Object}   req - Request object
 * @param  {Object}   res - Response object
 */
const respond = function(req, res) { 

	res.status(200).json({
		user: req.user,
		token: req.token
	});
};

//*******************************************************************=
//exports

module.exports.passport = passport;
module.exports.serialize = serialize;
module.exports.generate = generate;
module.exports.respond = respond;