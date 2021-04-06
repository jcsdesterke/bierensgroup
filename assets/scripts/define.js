// Firebase Connection Details
var firebaseConfig = {
  apiKey: "AIzaSyDi36GtoFXkqm5huU16B733NbTx8tm-1pg",
  authDomain: "bierensdb.firebaseapp.com",
  projectId: "bierensdb",
  storageBucket: "bierensdb.appspot.com",
  messagingSenderId: "436456185379",
  appId: "1:436456185379:web:e77271de5a75a507a79b96",
  measurementId: "G-VTM1CJKHH3",
};

// Initialize Firebase with the details
biri.init(firebaseConfig);

// Retrieve the user id
const userId = localStorage.getItem("userid");

// Function to generate a unique 12 digit ID
var ID = function () {
  return "_" + Math.random().toString(36).substr(2, 15);
};

// If there is no user id yet, generate a new one, otherwise retrieve the existing one
if (userId === null) {
  const uniqueId = ID();
  localStorage.setItem("userid", uniqueId);
  console.log(`New user id generated: ${uniqueId}`);
} else {
  console.log(`Existing user: ${userId}`);
}
