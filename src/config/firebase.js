import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyAZMWtR3djJUE-zFYdXaXVxJTWdgFnfldE',
    authDomain: 'pcd-jobs.firebaseapp.com',
    databaseURL: 'https://pcd-jobs.firebaseio.com',
    projectId: 'pcd-jobs',
    storageBucket: 'pcd-jobs.appspot.com',
    messagingSenderId: '90455975716'
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDb = firebase.database();