

var express = require('express');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var expressSession = require('express-session');
// var mongoStore = require('connect-mongo')({session: expressSession});
// var mongoose = require('mongoose');

var config = require('./server/config.js');

var app = express();
var server = require('http').Server(app);

if(!config.API_KEY){
    console.log("Please set your ACCOUNT_SECURITY_API_KEY environment variable before proceeding.");
    process.exit(1);
}
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
    extended: true
}));


var router = express.Router();

var users = require('./server/controllers/users.js');


router.route('/verification/start').post(users.requestPhoneVerification);
router.route('/verification/verify').post(users.verifyPhoneToken);



app.use('/api', router);
app.use('/', express.static(__dirname + '/public'));
server.listen(3100);
