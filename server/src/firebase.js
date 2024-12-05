require("dotenv").config(); //env

const { initializeApp, applicationDefault } = require("firebase-admin/app"); //usando firebase-admin
const { getFirestore } = require("firebase-admin/firestore"); //usando firestore

initializeApp({
  credential: applicationDefault(), //credenciales Firebase.json (local)
});

const db = getFirestore(); //instancia de firestore

module.exports = {
  db,
};
