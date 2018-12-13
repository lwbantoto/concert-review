// Imports
var express = require("express");
var admin = require("firebase-admin");

// Initialize Firebase
var serviceAccount = require('../service-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://concert-review.firebaseio.com"
});
const db = admin.database();

// Fetch all Artists from Firebase
async function fetchAllArtists() {
  var ref = db.ref();

  ref.on('value', snapshot => {
    console.log(snapshot.val());
  });
}

// TODO: Modify this function such that it takes in a name (string) and reviews (array of strings) parameter
// This function needs to append the artist along with its comments into the database if it does not already exist,
// Otherwise, append the review to the existing artist's reviews array.
async function addArtist() {
  var ref = db.ref("artists");

  // TODO: Instead of a hardcoded key, use firebase's built-in UUID

  ref.set({
    arianaGrande: {
      name: "Ariana Grande",
      reviews: ["Shit", "Not good"]
    }
  });
}

// Initialize Express
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  // Do nothing for now
  res.send('Acknowledge')
});

app.get('/artists', (req, res) => {
  // TODO: Package the artists object from firebase into the response body.
  // To verify that this works, monitor the browser's network console to check if the data exists in the response body. 

  getArtists() // Note: this just logs the data locally

  res.send("Should send Artist object here")
});

app.listen(4000, function() {
  console.log('Listening on port 4000')
});

// BONUS TODO: Refactoring
// Separate Firebase initializers into it's own file
// Separate Firebase methods into it's own file
