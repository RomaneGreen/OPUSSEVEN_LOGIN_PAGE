import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'




const config = {
    apiKey: "AIzaSyCvjJZrs2D-0UTbJksg02PaLJnbo4VQgCY",
    authDomain: "my-opus-app.firebaseapp.com",
    databaseURL: "https://my-opus-app.firebaseio.com",
    projectId: "my-opus-app",
    storageBucket: "",
    messagingSenderId: "458525841019",
    appId: "1:458525841019:web:c140b515563d0d61"
  };
  

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()