import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB2B-6113UbLKu8Od3928ILTMgRdHJmTws",
    authDomain: "cafeteria-mirador.firebaseapp.com",
    projectId: "cafeteria-mirador",
    storageBucket: "cafeteria-mirador.appspot.com",
    messagingSenderId: "83003837170",
    appId: "1:83003837170:web:4910e151e9987124ee5e6b",
    measurementId: "G-THGP09LBRN"
};

const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();

// export default firebase;