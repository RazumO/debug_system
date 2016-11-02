/**
 * Created by Olexa on 02.11.2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    logSchema;

blacklistSchema = new Schema({
    Token: String,
});

module.exports = mongoose.model('BlackList', blacklistSchema);