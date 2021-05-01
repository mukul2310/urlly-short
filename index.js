let express = require('express');
let app = express();
let port=process.env.PORT|| 8080;
app.listen(port,()=>
console.log("Server running"));
app.use('/',express.static(__dirname+'/public'));
// app.set('view engine','hbs');
// app.set('views','public');
let urlPrev;
app.use(express.urlencoded({extended:true}))
app.post('/',(req,res)=>
{
  urlPrev=req.body.url;
  res.redirect('/');
});
app.get('/',(req,res)=>
{
  res.render('home',{urlPrev});
});

app.get('/:url',(req,res)=>
{
  res.redirect(301,urlPrev);
});

const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// const snapshot = await db.collection('url').get();
// snapshot.forEach((doc) => {
//   console.log(doc.id, '=>', doc.data());
// });


// async function quickstartListen(db) {
//   // [START quickstart_listen]
//   // [START firestore_setup_dataset_read]
//   const snapshot = await db.collection('url').get();
//   snapshot.forEach((doc) => {
//     console.log(doc.id, '=>', doc.data());
//   });

//   // [END firestore_setup_dataset_read]
//   // [END quickstart_listen]
// }

// quickstartListen(db);




// async function quickstartAddData(db) {
//   // [START add_lovelace]
//   // [START firestore_setup_dataset_pt1]
//   const docRef = db.collection('users').doc('alovelace');

//   await docRef.set({
//     first: 'Ada',
//     last: 'Lovelace',
//     born: 1815
//   });
//   // [END firestore_setup_dataset_pt1]
//   // [END add_lovelace]

//   // [START add_turing]
//   // [START firestore_setup_dataset_pt2]
//   const aTuringRef = db.collection('users').doc('aturing');

//   await aTuringRef.set({
//     'first': 'Alan',
//     'middle': 'Mathison',
//     'last': 'Turing',
//     'born': 1912
//   });
  // [END firestore_setup_dataset_pt2]
  // [END add_turing]
// }