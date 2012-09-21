app = module.parent.exports.app;
var baseController = require('../controllers/base');
var siteController = require('../controllers/site');
var userController = require('../controllers/user');

/* Middleware authentication */
function requiresLogin(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/?redir=' + req.url);
    }
}

function isSignedIn(req, res) {
    if (req.session.user) {
        res.json(true);
    } else {
        res.json(false);
    }
}

function isAdmin(req, res) {
    if (req.session.user) {
        if(req.session.user.role === "admin") {
            res.json(true);
        }
        else {
            res.json(false);
        }
    } else {
        res.json(false);
    }
}

app.get('/', userController.addSesssion);
app.del('/signin', userController.removeSesssion);
app.post('/signin', userController.insertSesssion);
app.get('/issignedin', isSignedIn);
app.get('/isadmin', isAdmin);

app.get('/search', siteController.searchRatings);
app.get('/searchdata', siteController.searchRatingsData);
app.get('/ratings/new', requiresLogin, siteController.addRating);
app.get('/ratings/edit/:id', requiresLogin, siteController.editRating);
app.get('/ratings/delete/:id', requiresLogin, siteController.deleteRating);
app.get('/ratings/approve/:id', requiresLogin, siteController.approveRating);
app.get('/ratings/view/:id', siteController.viewRating);

app.get('/reviewers', siteController.getReviewers);

app.post('/ratings', requiresLogin, siteController.insertRating);
app.put('/ratings', requiresLogin, siteController.updateRating);
app.del('/ratings', requiresLogin, siteController.deleteRating);

