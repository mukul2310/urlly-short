
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
const bcrypt = require('bcrypt');


function encryptingURL(longUrl)
{
  let a=new Date().getTime()%100;
  return "def"+a;
}

async function addDocument(data) 
{

  const res = await db.collection('url').add(data);

  // console.log('Added document with ID: ', res.id);

  // console.log('Add: ', res);
}


async function getAll() 
{
  const col = db.collection('url');
  const allData = await col.get();
  allData.forEach(doc => {
    // console.log(doc.id, '=>', doc.data());
  });
}



async function getOne(req) 
{
  const col = db.collection('url');
  const allData = await col.get();
  // required_shortcode=JSON.parse(JSON.stringify(req))
  allData.forEach(doc => 
  {
    if(doc.data().hash_url==req && doc.data().expiration_date>new Date().getTime())
    {
      // console.log(doc.data());
      result=doc.data().original_url;
    }
  });
  return result;
}

module.exports={addDocument,getAll,getOne,encryptingURL};