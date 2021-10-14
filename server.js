const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

const collection='url';

if (!admin.apps.length) {
  admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
let crypto = require('crypto');

//write a function for encoding a url to base-62 and take initial 4 characters to make slug

function encryptingURL(longUrl) //taking first 4 characters
{
  const name = longUrl;
  const hash = crypto.createHash('md5').update(name).digest('hex');
  return hash.slice(0,4);
}
function encryptingURLRandom(longUrl)  //taking random 4 consecutive characters
{
  const name = longUrl;
  const hash = crypto.createHash('md5').update(name).digest('hex');
  let num;
  num = Math.floor(Math.random() * 10); // Returns a random integer from 0 to 9
  while(num>hash.length-5)
  {
    num = Math.floor(Math.random() * 10); // Returns a random integer from 0 to 9
  }
  return hash.slice(num,num+4);
}
function encodingURL(longUrl)
{
  return Buffer.from(longUrl).toString('base64')
}
function decodingURL(longUrl)
{
  let buff = Buffer.from(longUrl, 'base64');
  let text = buff.toString('ascii');
  return text
}
async function addDocument(data,id) 
{
  // converting longurl to base64
  let longUrl = data.original_url;
  let encodedLongUrl =encodingURL(longUrl);
  data.original_url=encodedLongUrl;
// console.log('"' + data + '" converted to Base64 is "' + base64data + '"');
  const res = await db.collection(collection).doc(id).set(data);
}

async function getOne(req) 
{
  const col = db.collection(collection).doc(req);
  const doc= await col.get();
  await col.update({clicks: Number(doc.data().clicks)+1});
  let result;
  if(doc.data().expiration_date>new Date().getTime())
  {
    //decode the url
    let data = doc.data().original_url;
    result= decodingURL(data);
  }
  else
  {
    await col.delete();
  }
  return result;
}

async function getOneByPass(req)
{
  const id=req.body.custom_url;
  const pass=req.body.pass;
  const col = db.collection(collection).doc(id);
  const doc= await col.get();
  let result=new Object();
  if(doc.data().expiration_date>new Date().getTime()&&doc.data().pass_custom_url==pass)
  {
    //decode the url
    let data = doc.data().original_url;
    result.longUrl=decodingURL(data);
    result.shortUrl=doc.data().custom_url;
    result.expiry=doc.data().expiration_date;
    result.clicks=doc.data().clicks;
    return result;
  }
  else if(doc.data().expiration_date<new Date().getTime())
  {
    await col.delete();
    throw new EvalError;
  }
}

async function checkIfAlreadyPresent(req)
{
  try 
  {
    const col = db.collection(collection).doc(req);
    const doc= await col.get();
    return doc.data();
  }
  catch (error) 
  {
    return false;    
  }
}
async function updateData(req)
{
  const id=req.body.custom_url;
  const longUrl=encodingURL(req.body.original_url);
  const pass=req.body.pass;
  const col = db.collection(collection).doc(id);
  await col.update({original_url: longUrl,pass_custom_url:pass});
}

async function deleteData(req)
{
  const col = db.collection(collection).doc(req);
  await col.delete();
}

module.exports={addDocument,getOne,encryptingURL,encryptingURLRandom,encodingURL,getOneByPass,updateData, checkIfAlreadyPresent, deleteData};