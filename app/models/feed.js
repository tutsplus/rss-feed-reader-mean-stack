'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Feeds Schema.
 */
var FeedsSchema = new Schema ({
    feedUrl: {
        type: String,
        default: '',
        trim: true
    },

    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Statics
 */
FeedsSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Feeds', FeedsSchema);
