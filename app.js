var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://arthurferrazavila:bC33wZByyEQfSUJ7@risco.skuiw7m.mongodb.net/?retryWrites=true&w=majority&appName=Risco', { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)});

const userRoute = require('./routes/user.route');
const riskRoute = require('./routes/risk.route');
var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRoute);
app.use('/risk', riskRoute);
app.get('/', function(req, res){
   res.send("Hello World!");
});

app.listen(3000,function(){
    console.log('Listening on port 3000!');
});