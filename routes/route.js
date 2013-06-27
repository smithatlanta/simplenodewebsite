app = module.parent.exports.app;
var baseController = require('../controllers/base');
var siteController = require('../controllers/site');
var userController = require('../controllers/user');

/* Middleware authentication */
function authenticate(req, res, next) {
    if (req.headers.authorization) {
		userController.authenticateSession(req, res, function(user){
			if(user !== null){
				next();
			}
			else{
				res.send(401);
			}
		});
    }
    else
    {
		res.send(401);
    }
}

app.get('/', siteController.index);
app.get('/partials/:name', siteController.partials);

app.post('/signin', userController.authenticate);

app.post('/search', authenticate, siteController.searchRatings);

app.get('/users', authenticate, userController.getUsers);
app.get('/user/:id', authenticate, userController.getUser);
app.post('/user', userController.insertUser);
app.put('/user/:id', authenticate, userController.updateUser);
app.del('/user/:id', authenticate, userController.deleteUser);

app.get('/ratings', authenticate, siteController.getRatings);
app.get('/rating/:id', authenticate, siteController.getRating);
app.post('/rating', authenticate, siteController.insertRating);
app.put('/rating', authenticate, siteController.updateRating);
app.del('/rating/:id', authenticate, siteController.deleteRating);

// redirect all others to the index (HTML5 history)
app.get('*', siteController.index);