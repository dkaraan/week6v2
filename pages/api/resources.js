// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//import firebase library we created earlier 
import firebase from"../../lib/firebase";


//async function to get wait for the api function
export default async function handler(req, res) {
  try{
    //ask firestore database to .get() every document in resources collection
    const snapshot = await /*waiting until method called returns results*/ firebase.collection("resources" /*the string passed in firebase collection is the name of the collection in the firebase database*/).get();

    let output = [];

    //looping the data
    snapshot.forEach(
      (doc)=>{
        output.push(
          {
            id: doc.id, //.id is the unique identifier in the colllection
            data: doc.data() //.data() is holding each of the property values
          }
        );
      }
    );

    console.log(output);
    //returning newly constructed object vales of all firestore document data.
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({output});

  } catch(err) {
    //if error shows in node console it will catch the object and log it into the console
    console.error(err);
    //returning 500 error code and the message of the error via err.message into the browser
    res.status(500).end(err.message);
  }
}
