
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { authenticated:false });
  console.log('index');
};

/**
 * Login route
 */
exports.login = function(req,res){
	res.render('login');
	console.log('login');
}

/**
 * Signup route
 */
exports.signup = function(req,res){
	res.render('signup');
	console.log('signup');
}

