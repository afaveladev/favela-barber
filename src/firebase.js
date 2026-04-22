// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyADZAG6JVLd...",
  authDomain: "favelas-barber.firebaseapp.com",
  databaseURL: "https://favelas-barber-default-rtdb.firebaseio.com",
  projectId: "favelas-barber",
  storageBucket: "favelas-barber.appspot.com",
  messagingSenderId: "893634123422",
  appId: "1:893634123422:web:52340e5b392d3d701c87b"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar la base de datos
export const db = getDatabase(app);