import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
    apiKey: "AIzaSyAimeiTuf792Rwjw70V2qH33sgvu7QhTaY",
    authDomain: "crwn-db-4e9ca.firebaseapp.com",
    databaseURL: "https://crwn-db-4e9ca.firebaseio.com",
    projectId: "crwn-db-4e9ca",
    storageBucket: "crwn-db-4e9ca.appspot.com",
    messagingSenderId: "746009038133",
    appId: "1:746009038133:web:f240963fc663987b99d07c",
    measurementId: "G-HGELCTZW9S"
 };

export const createUserProfileDocument = async (userAuth,additionalData) => {
	if(!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get()

	if(!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch(error) {
			console.log('error creating user', error.message)
		}
	}

	return userRef;
}

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;