import firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PID,
    storageBucket: process.env.REACT_APP_SB,
    messagingSenderId: process.env.REACT_APP_SID,
    appId: process.env.REACT_APP_APPID,
};

firebase.initializeApp(config);

export const useFirestore = () => {
    const firestore = firebase.firestore();
    return firestore;
};

export const fb = firebase.firestore;
