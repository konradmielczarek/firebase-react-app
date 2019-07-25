import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { config } from '../config/firebaseConfig'

import { decorate, observable, action } from 'mobx';

export default class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
  }

  isAuthenticated = false;
  isAdmin = false;
  authenticatedUser = '';
  userUid = '';
  isChecking = false;
  USERS_PENDING = false;
  users = [];
  usersTotal = null;
  usersLimit = 10;
  userData = {};

  // *** AUTH API ***

  registerUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  logInUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  logOut = () => this.auth.signOut();

  checkUserAuth = () => {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.authenticatedUser = user.email;
        this.isAuthenticated = true;
        this.userUid = user.uid;

        this.isUserAdmin(user.uid)
        .then(() => console.log(this.isAdmin))

        this.getUser(user.uid);
      } else {
        this.isAuthenticated = false;
      }
    })
  };

  reauthenticate = (password) => {
    const user = this.auth.currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );

    return user.reauthenticateWithCredential(credential);
  };

  getToken = () => {
    this.auth.currentUser.getIdToken(true)
      .then(token => !!token && token)
      .catch(err => console.error(err));
  };

  setIsChecking = (isChecking) => {
    this.isChecking = isChecking;
  };

  // *** USER API ***

  getUsers = (from, to) => {
    const usersRef = this.db.collection('users');

    this.USERS_PENDING = true;

    usersRef.get()
    .then(snapshot => {
      this.users = [];
      snapshot.forEach(doc => {
        this.users.push({ uid: doc.id, ...doc.data() });
      });

      this.usersTotal = this.users.length;
      this.users = this.users.slice(from, to);

      this.USERS_PENDING = false;
    })
  };

  getUser = (uid) => {
    this.db.doc(`users/${uid}`).get()
    .then(res => {
      this.userData = res.data();
    })
  };

  addUser = (uid, email) => (
    this.db.doc(`users/${uid}`)
    .set({
      uid: uid,
      email: email,
      isAdmin: false,
      creationDate: new Date().toISOString()
    })
  );

  isUserAdmin = (uid) => (
    this.db.doc(`users/${uid}`).get()
    .then(res => {
      this.isAdmin = res.data().isAdmin;
    })
  );

  changePassword = (password) => {
    const user = firebase.auth().currentUser;

    return (
      user.updatePassword(password)
    )
  };

  deleteUser = () => {
    const user = firebase.auth().currentUser;

    this.deleteUserFromDb();

    return (
      user.delete()
    )
  };

  deleteUserFromDb = () => {
    const user = firebase.auth().currentUser;

    return (
      this.db.doc(`users/${user.uid}`).delete()
    )
  };
}

decorate(Firebase, {
  isAuthenticated: observable,
  isAdmin: observable,
  authenticatedUser: observable,
  userUid: observable,
  isChecking: observable,
  users: observable,
  USERS_PENDING: observable,
  usersTotal: observable,
  usersLimit: observable,
  registerUser: action,
  logInUser: action,
  logOut: action,
  getToken: action,
  setIsChecking: action,
  getUsers: action,
  getUser: action,
  changePassword: action,
  isUserAdmin: action,
});