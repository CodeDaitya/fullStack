var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('./models/user');
var config = require('./config');


exports.passport = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.facebook = passport.use(new FacebookStrategy({
	clientID: config.facebook.clientID,
	clientSecret: config.facebook.clientSecret,
	callbackURL: config.facebook.callbackURL
},
	function(accessToken, refreshToken, profile, done){
		User.findOne({OathId: profile.id}, function(err, user){
			if (err) console.log(err);

			if (!err && user!==null) {
				return done(null, user);
			} else {
				user = new User({
					username: profile.displayName
				});
				user.OathId = profile.id;
				user.OauthToken = accessToken;
				user.save(function(err){
					if (err) console.log(err);
					else{
						console.log('saving user..');
						return done(null, user);
					}
				});
			}
		});
	}
));
