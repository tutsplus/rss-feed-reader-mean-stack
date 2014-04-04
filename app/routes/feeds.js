'use strict';

var feeds = require('../controllers/feeds');
var authorization = require('./middlewares/authorization');

// Feeds authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.feed.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {
    app.get('/feeds', feeds.all);
    app.post('/feeds', authorization.requiresLogin, feeds.create);
    app.get('/feeds/:feedId', feeds.show);
    app.put('/feeds/:feedId', authorization.requiresLogin, hasAuthorization, feeds.update);
    app.del('/feeds/:feedId', authorization.requiresLogin, hasAuthorization, feeds.destroy);

    // Finish with setting up the feedId param
    app.param('feedId', feeds.feed);
};
