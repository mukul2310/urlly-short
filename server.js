const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
let crypto = require('crypto');

//write a function for encoding a url to base-62 and take initial 4 characters to make slug

function encryptingURL(longUrl)
{
  let name = longUrl;
  let hash = crypto.createHash('md5').update(name).digest('hex');
  return hash.slice(0,4);
}

async function addDocument(data,id) 
{
  // converting longurl to base64
  let longUrl = data.original_url;
  let encodedLongUrl =Buffer.from(longUrl).toString('base64');
  data.original_url=encodedLongUrl;
// console.log('"' + data + '" converted to Base64 is "' + base64data + '"');
  const res = await db.collection('url').doc(id).set(data);
}

async function getOne(req) 
{
  const col = db.collection('url').doc(req);
  const doc= await col.get();
  await col.update({clicks: Number(doc.data().clicks)+1});
  let result;
  if(doc.data().expiration_date>new Date().getTime())
  {
    //decode the url
    let data = doc.data().original_url;
    let buff = Buffer.from(data, 'base64');
    let text = buff.toString('ascii');
    result=text;
  }
  else
  {
    const res = await col.delete();
  }
  return result;
}

async function getOneByPass(req)
{
  const id=req.body.custom_url;
  const pass=req.body.pass;
  const col = db.collection('url').doc(id);
  const doc= await col.get();
  let result=new Object();
  if(doc.data().expiration_date>new Date().getTime()&&doc.data().pass_custom_url==pass)
  {
    //decode the url
    let data = doc.data().original_url;
    let buff = Buffer.from(data, 'base64');
    let text = buff.toString('ascii');
    result.longUrl=text;
    result.shortUrl=doc.data().custom_url;
    result.expiry=doc.data().expiration_date;
    result.clicks=doc.data().clicks;
    return result;
  }
  else
  {
    const res = await col.delete();
    throw new EvalError;
  }
}

module.exports={addDocument,getOne,encryptingURL,getOneByPass};