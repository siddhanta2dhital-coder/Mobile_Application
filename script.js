// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, set, get, ref, update, remove } 
from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "mobile-application-83b75.firebaseapp.com",
  databaseURL: "https://mobile-application-83b75-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mobile-application-83b75",
  storageBucket: "mobile-application-83b75.firebasestorage.app",
  messagingSenderId: "725568522613",
  appId: "1:725568522613:web:994274d91a51aa20b6ab3c",
  measurementId: "G-780NB17HQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log("Database connected:", db);



// ========================
// CREATE USER
// ========================

function handleCreateUser() {
  const userId = document.getElementById("create-id").value;

  const userData = {
    name: document.getElementById("create-name").value,
    email: document.getElementById("create-email").value,
    age: parseInt(document.getElementById("create-age").value),
    phone: document.getElementById("create-phone").value,
    address: document.getElementById("create-address").value,
    city: document.getElementById("create-city").value,
    country: document.getElementById("create-country").value,
    gender: document.getElementById("create-gender").value,
    occupation: document.getElementById("create-occupation").value
  };

  const userRef = ref(db, "users/" + userId);

  set(userRef, userData)
    .then(() => {
      console.log("User added successfully!");
      alert("User added successfully!");
    })
    .catch((error) => {
      console.error("Error adding user:", error);
    });
}

window.handleCreateUser = handleCreateUser;



// ========================
// READ USERS
// ========================

function readUser() {
  const userRef = ref(db, "users");

  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.key, childSnapshot.val());
      });
    } else {
      console.log("No data available");
    }
  });
}

window.readUser = readUser;



// ========================
// UPDATE USER
// ========================

function handleUpdateUser() {
  const userId = document.getElementById("update-id").value;

  const updatedData = {
    name: document.getElementById("update-name").value,
    email: document.getElementById("update-email").value
  };

  const userRef = ref(db, "users/" + userId);

  update(userRef, updatedData)
    .then(() => {
      console.log("User updated successfully!");
      alert("User updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}

window.handleUpdateUser = handleUpdateUser;



// ========================
// DELETE USER
// ========================

function handleDeleteUser() {
  const userId = document.getElementById("delete-id").value;

  const userRef = ref(db, "users/" + userId);

  remove(userRef)
    .then(() => {
      console.log("User deleted successfully!");
      alert("User deleted successfully!");
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

window.handleDeleteUser = handleDeleteUser;
