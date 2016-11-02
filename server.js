/**
 * Created by Olexa on 02.11.2016.
 */
const DEFAULT_PORT = 8080;

var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    config = require('./config');

var port = process.env.PORT || DEFAULT_PORT;
mongoose.connect(config.connection_string);

app.set('userSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require('./app/controllers')(app));

app.listen(port, (err) => {
    if (err) {
        return console.log('Server failed to start: ', err)
    }

    console.log(`Server is listening on ${port}.`);
});