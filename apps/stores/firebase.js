
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCsMugKknZRCUYrvt_LIjchcwUgw5ygo80",
    authDomain: "bk-proxconn.firebaseapp.com",
    projectId: "bk-proxconn",
    storageBucket: "bk-proxconn.appspot.com",
    messagingSenderId: "308111250197",
    appId: "1:308111250197:web:2598be82d87c2cbee58f1c"
};

let app;
if (firebase.apps.length===0) {
    app = firebase.initializeApp(firebaseConfig);
}
else{
    app = firebase.app();
}
const db= app.firestore();
const auth = app.auth();
export {db, auth};