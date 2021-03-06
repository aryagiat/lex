/**
 * firebase.js
 * 
 * Handle firebase stuff
 */

import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore';
import 'firebase/storage';

// Initialize the firebase app with its config values from the environment variables
const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

// Export the authentication instance.
export const auth = app.auth();

// Export the database.
export const firestore = app.firestore();
export const database = {
    users: firestore.collection('users'),
    events: firestore.collection('events'),
    sports: firestore.collection('sports'),
    formatDoc: doc => {
        return { id: doc.id, ...doc.data() }
    },
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const fireStorage = app.storage();

//Export storage to store files
export const storage = firebase.storage();

// Export firebase in general to be used anywhere in the application
export default app;