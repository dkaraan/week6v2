//same as import admin from "firebase-admin";
//need to load firebase admin in order to interact with the project
var admin = require("firebase-admin");

//load firebase json
const serviceAccount = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_PRIVATE_KEY
  )
//above converts json string into a json file object instead of just straight up loading the JSON file as it is a more secure way than what is done below:
  //var serviceAccount = require("path/to/serviceAccountKey.json");


//wrap code and use try{} top catch errors
try {
  admin.initializeApp(
    {
      //.cert() sends the json file to give a valid log in credential
      credential: admin.credential.cert(serviceAccount),

      //telling where database URL is
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    }
  );
}
//catch will run if anything is an error 
catch(err){
  //dump error into console.log
  console.log("Firebase err", err.stack)
}

//if successful exports reference database
export default admin.firestore();