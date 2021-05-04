const express = require('express');
const app = express();
const url = require('url');
const serv= require("./server.js");
const port=process.env.PORT|| 8080;
app.listen(port,()=>
console.log("Server running on " + port));
app.use('/',express.static(__dirname+'/public'));
// app.set('view engine','hbs');
// app.set('views','public');
// let urlPrev;
app.use(express.urlencoded({extended:true}))

app.post('/api',(req,res)=>
{
  // urlPrev=req.body.url;
  // let data="'"+req.body+"'";
  
  doc=JSON.parse(JSON.stringify(req.body));
  // res.send(doc);
  // doc=JSON.parse(doc);
  doc.hash_url=serv.encryptingURL(doc.original_url);
  serv.addDocument(doc);
  res.send(doc.hash_url);
  // serv.addDocument(doc)
  // res.redirect('/');
  //check some conditions
  //if(conditions satisfied ) put in database 
  // else reject the url
});
// app.get('/',(req,res)=>
// {
//   res.render('home',{urlPrev});
// });

app.get('/:url',(req,res)=>
{
  (async () => 
  {
    // let data=console.log( await serv.getOne(req.params.url))
    // console.log( await serv.long_url)
    const myURL = new URL(await serv.getOne(req.params.url));
    res.redirect(301,myURL.href);
  })()
  
});