//library for "resources" firestore collection

//loading in firebase library in same folder
import firebase from "./firebase";

//return all valid ids for getStaticPaths()
export async function getResourceIds(){
  //will hold data
  let output = [];

  //wrap try around code to catch errors if they occur
  try {
    //ask firestore database to .get() every document in resources collection
    const snapshot = await firebase.collection("resources" /*the string passed in firebase collection is the name of the collection in the firebase database*/).get();

    //loop and build out the data from the firestore collection
    snapshot.forEach(
      (doc)=>{
      output.push(
        {
          //next js wasnts this format for specific oject value when sending to getStaticPaths()
          params:{
            id:doc.id
            }
          }
        );
      }
    );
    
  } catch(error){ 
  console.error(error);
  }
  console.log("getResourceIds output:")
  console.log(output);
  return output;
}

//Returns one document's data for matchin ID for getStaticProps()
export async function getResourceData(idRequested){
//retreive once document from our firestore collection matched by unique id
  const doc = await firebase.collection("resources").doc(idRequested).get();

  //error handling
  let output;
  if(!doc.empty){
    output = {id: doc.id, data: doc.data() };
  } 
  
  else {
    output = null;
  }

  return output;
}