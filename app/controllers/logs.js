/**
 * Created by Olexa on 02.11.2016.
 */
var express = require('express'),
    router = express.Router(),
    Log = require('./../models/log.js'),
    logger = require('./../helpers/logger.js'),
    jwtChecker = require('express-jwt'),
    protectorMiddleware = require('./../middleware/protector');

module.exports = function (app) {

    router.use(protectorMiddleware(app));

    router.get('/logs', function(req, res) {
        Log.find({})
            .then(function (logs) {
                res.json(logs);
            })
            .catch(function (err) {
                console.log(err);
                logger.log(userId, err)
                    .catch(logger.processLoggerError);
            })
    });

    router.get('/users/logs/me', function(req, res) {
        var userId = req.decoded._doc._id;

        Log.find({UserId: userId})
            .then(function (logs) {
                res.json(logs);
            })
            .catch(function (err) {
                console.log(err);
                logger.log(userId, err)
                    .catch(logger.processLoggerError);
            });
    });

    router.use(function (err, req, res, next) {
        console.log(err.name);
        if (err.name === 'UnauthorizedError') {
            return res.status(401).send('Invalid token.');
        } else {
            next();
        }
    });

    return  router;
};

