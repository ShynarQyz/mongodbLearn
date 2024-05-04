var express = require('express');
var app = module.exports = express.createServer();


require('./config/enviroment.js')(app, express);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

require('./config/routes.js')(app);

app.listen(3000);