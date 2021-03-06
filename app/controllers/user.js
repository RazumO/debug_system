const DEFAULT_EXPIRES_TIME = '10h';

var express = require('express'),
    router = express.Router(),
    User = require('./../models/user.js'),
    passwordHash = require('password-hash'),
    jwt = require('jsonwebtoken'),
    protectorMiddleware = require('./../middleware/protector'),
    BlackList = require('./../models/blacklist.js'),
    logger = require('./../helpers/logger.js');

module.exports = function (app) {

    // function hashPassword(password) {
    //     return passwordHash.generate(password);
    // }

    function verifyPassword(passwordToCheck, hashedPassword) {
        return passwordHash.verify(passwordToCheck, hashedPassword);
    }

    function createToken(user, expiresTime) {
        if (!expiresTime) expiresTime = DEFAULT_EXPIRES_TIME;
        return jwt.sign(user, app.get('userSecret'), {
            expiresIn: expiresTime
        });
    }

    router.post('/login', function(req, res) {
        if (!req.body.name) {
            return res.json({ success: false, message: 'User name is empty.' });
        }

        User.findOne({
            name: req.body.name
        }).then(function (user) {
            if (!user) {
                return res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (verifyPassword(req.body.password, user.password)) {
                logger.log(user._id, { message: `User with id ${user._id} was successfully logged in.`})
                    .catch(logger.processLoggerError)
                    .then(function () {
                        res.json({
                            success: true,
                            token: createToken(user)
                        });
                    });
            }
            else {
                logger.log(user._id, { message: `User with id ${user._id} fails to log in because of wrong password.`})
                    .catch(logger.processLoggerError)
                    .then(function () {
                        return res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    });
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500);
        })
    });

    router.use('/logout', protectorMiddleware(app));

    router.get('/logout', function (req, res) {
        var blackListItem = new BlackList();
        blackListItem.Token = req.token;
        blackListItem.save().then(function () {
            res.json({ success: true, message: 'User was successfully logged out.' });
        }).catch(function (err) {
            console.log(err);
            res.status(500);
        });

    });

    return router;
};





// router.get('/', function(req, res) {
//     User.find({}, function(err, users) {
//         res.json(users);
//     });
// });
