let express = require('express');  
let app = express();
let port=8080;
app.listen(port,()=>
console.log("Server running"));

app.get('/', function (req, res) 
{
  res.sendFile('index.html', { root: '.' });
});
app.get('/open', function (req, res) 
{
  res.redirect(301,"https://bitly.com/");
});