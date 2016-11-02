var BlackList = require('./../models/blacklist.js'),
    Log = require('./../models/log.js'),
    jwt = require('jsonwebtoken');

module.exports = function (app) {

    return function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, app.get('userSecret'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    BlackList.findOne({Token: token})
                        .then(function (blockedToken) {
                            if (blockedToken) {
                                console.log(blockedToken);
                                return res.json({ success: false, message: 'Failed to authenticate token.' });
                            } else {
                                req.decoded = decoded;
                                req.token = token;
                                next();
                            }
                        })

                }
            });

        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    }
};