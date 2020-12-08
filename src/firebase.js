import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyB6wbak_TUXWoX7Xq3jibfwoovTwGy2j34",
    authDomain: "question-paper-6f4c0.firebaseapp.com",
    databaseURL: "https://question-paper-6f4c0.firebaseio.com",
    projectId: "question-paper-6f4c0",
    storageBucket: "question-paper-6f4c0.appspot.com",
    messagingSenderId: "197050971694",
    appId: "1:197050971694:web:d76fc02a42b6a571a611bf"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export {auth, provider,storage}
  export default db;