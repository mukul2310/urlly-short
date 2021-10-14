const express = require('express');
const app = express();
const serv = require("./server.js");
const port = process.env.PORT|| 8080;
app.listen(port,()=>
console.log("Server running on " + port));
app.use('/',express.static(__dirname+'/public'));
app.use('/analytics',express.static(__dirname+'/public/analytics.html'));
app.use(express.urlencoded({extended:true}))

app.post('/create_short_url',async(req,res)=>
{
  doc=req.body;
  let shortUrl;
  if(!doc.custom_url)
  {
    shortUrl=serv.encryptingURL(doc.original_url);
    const encUrl= serv.encodingURL(doc.original_url);
    let data = await serv.checkIfAlreadyPresent(shortUrl);
    while(data && data.original_url != encUrl)
    {
      shortUrl = serv.encryptingURLRandom(doc.original_url);
      data = await serv.checkIfAlreadyPresent(shortUrl);
    }
    serv.addDocument(doc,shortUrl);
    res.send(shortUrl);
  }
  else
  {
    shortUrl = doc.custom_url;
    const data = await serv.checkIfAlreadyPresent(shortUrl);
    if(data)
    {
      res.send(false);
    }
    else
    {
      shortUrl=doc.custom_url;
      serv.addDocument(doc,shortUrl);
      res.send(shortUrl);
    }
  }  
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

app.post('/authentication',(req,res)=>
{
  (async () => 
  {
    try 
    {
      let result=await serv.getOneByPass(req);
      res.send(result); 
    } catch (err) 
    {
      res.send(null);
    }
  })()
});

app.post('/update',(req,res)=>
{
  (async () => 
  {
    try 
    {
      await serv.updateData(req);
      res.send('200')
    } catch (err) 
    {
      res.send('404');
    }
  })()
})
app.post('/delete',(req,res)=>
{
  (async () => 
  {
    try 
    {
      await serv.deleteData(req.body.custom_url);
      res.send('200')
    } catch (err) 
    {
      res.send('404');
    }
  })()
})