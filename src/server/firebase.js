import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const config = {
  apiKey: "AIzaSyBEuXm3v9SmmsAUyIklBfhGOGFdIIRoTTE",
  authDomain: "openhaus2-dff8f.firebaseapp.com",
  databaseURL: "https://openhaus2-dff8f.firebaseio.com",
  projectId: "openhaus2-dff8f",
  storageBucket: "openhaus2-dff8f.appspot.com",
  messagingSenderId: "58744893171",
  appId: "1:58744893171:web:544a0f9525f0d37a7e1186",
  measurementId: "G-QGBD639S2K",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.firestore();
    this.auth = app.auth();
  }
  estaIniciado() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }
}
export default Firebase;
