import { initializeApp } from "firebase/app";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDvrOQA5Az_TueH_mGv8FoyMXjcklSFIFU",
  authDomain: "websiteotp-f67cc.firebaseapp.com",
  projectId: "websiteotp-f67cc",
  storageBucket: "websiteotp-f67cc.appspot.com",
  messagingSenderId: "664041852838",
  appId: "1:664041852838:web:c7f5ea46661f82caedc967",
  measurementId: "G-PR01GS9BRR"
};


const app = initializeApp(firebaseConfig);
export {app}