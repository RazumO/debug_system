/**
 * Created by Olexa on 02.11.2016.
 */
var express = require('express'),
    router = express.Router();

module.exports = function (app) {
    router.use('/users', require('./user')(app));
    router.use(require('./logs')(app));

    return  router;
};
