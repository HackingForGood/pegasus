let express = require('express');
let routes = require('./routes');
var app = express();
var bodyParser = require('body-parser');
let plaid = require('./routes/plaid');
let donor = require('./routes/donor');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

plaid(app);
donor(app);


app.get('/', (request, response) => {
  response.send('HOME')
});


let port = process.env.port || 9001;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
