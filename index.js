let express = require('express');
const db = require('mongodb');
let app = express();
let port=8080;
app.listen(port,()=>
console.log("Server running"));
app.use('/images', express.static(__dirname + '/images'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.get('/', function (req, res) 
{
  res.sendFile('index.html', { root: '.' });
});
app.get('/open', function (req, res) 
{
  res.redirect(301,"https://bitly.com/");
});
// // The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>

// // TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>

//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyAC0C35M7GLMq7avtGimRvReP1wqks-HqY",
//     authDomain: "url-shortener-e4ec6.firebaseapp.com",
//     projectId: "url-shortener-e4ec6",
//     storageBucket: "url-shortener-e4ec6.appspot.com",
//     messagingSenderId: "506344431642",
//     appId: "1:506344431642:web:40ac211bc6b19eba21f1a3",
//     measurementId: "G-X54BSDKSPL"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();