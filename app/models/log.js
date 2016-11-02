/**
 * Created by Olexa on 02.11.2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    logSchema;

logSchema = new Schema({
    UserId: String,
    Data: {type: mongoose.Schema.Types.Mixed, default: {}},
    CreatedDate: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Log', logSchema);