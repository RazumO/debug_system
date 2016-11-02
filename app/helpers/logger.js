var Log = require('./../models/log.js');

function Logger () {
    this.processLoggerError = function processLoggerError(reason) {
        console.log(reason);
        return true;
    };

    this.log = function (user_id, debugInfo) {
        return new Promise(function (res, rej) {
            if(!user_id || !debugInfo) {
                rej();
            }
            var log = new Log({
                UserId: user_id,
                Data : debugInfo,
                CreatedDate: Date.now()
            });

            log.save(function(err) {
                if (err) rej(err);
                res();
                console.log('Debug information logged.');
            });
        })
    };
}

module.exports = new Logger;