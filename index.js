const express = require('express');
const app = express();
const serv= require("./server.js");
const port=process.env.PORT|| 8080;
app.listen(port,()=>
console.log("Server running on " + port));
app.use('/',express.static(__dirname+'/public'));
app.use('/analytics',express.static(__dirname+'/public/analytics.html'));
app.use(express.urlencoded({extended:true}))

app.post('/api',(req,res)=>
{
  doc=JSON.parse(JSON.stringify(req.body));
  let shortUrl;
  if(!doc.custom_url)
    shortUrl=serv.encryptingURL(doc.original_url);
  else
    shortUrl=doc.custom_url;
  serv.addDocument(doc,shortUrl);
  res.send(shortUrl);
});

app.get('/:url',(req,res)=>
{
  (async () => 
  {
    try 
    {
      const myURL = new URL(await serv.getOne(req.params.url));
      res.redirect(myURL.href);  
    } catch (err) 
    {
      res.sendFile('404.html', {root: __dirname+'/public' })
    }
  })()
});