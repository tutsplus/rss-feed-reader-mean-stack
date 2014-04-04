'use strict';

var mongoose = require('mongoose'),
    Feeds = mongoose.model('Feeds'),
    _ = require('lodash');

exports.feed = function (req, res, next, id) {
    Feeds.load(id, function (err, feed) {
        if (err) return next(err);

        if (!feed) return next(new Error('Failed to load feed ' + id));

        req.feed = feed;

        next();
    });
};

/**
 * Show a feed
 */
exports.show = function(req, res) {
    res.jsonp(req.feed);
};

/**
 * List of Feeds
 */
exports.all = function(req, res) {
    Feeds.find().sort('-created').populate('user', 'feedUrl').exec(function(err, feeds) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(feeds);
        }
    });
};

/**
 * Create a feed
 */
exports.create = function(req, res) {
    var feed = new Feeds(req.body);
    feed.user = req.user;

    feed.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                feed: feed
            });
        } else {
            res.jsonp(feed);
        }
    });
};

/**
 * Update a feed
 */
exports.update = function(req, res) {
    var feed = req.feed;

    feed = _.extend(feed, req.body);

    feed.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                feed: feed
            });
        } else {
            res.jsonp(feed);
        }
    });
};

/**
 * Delete a feed
 */
exports.destroy = function(req, res) {
    var feed = req.feed;

    feed.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                feed: feed
            });
        } else {
            res.jsonp(feed);
        }
    });
};