let express = require('express');
let routes = require('./routes');
var app = express();


app.get('/', (request, response) => {
  response.send('HOME')
});


let port = process.env.port || 9001;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
