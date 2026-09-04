import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getDatabase, ref, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const app = initializeApp(window.ROUE_FIREBASE_CONFIG);
const auth = getAuth(app);
const database = getDatabase(app);
const button = document.getElementById("authButton");
const title = document.getElementById("connectionTitle");
const detail = document.getElementById("connectionDetail");

button.addEventListener("click", async () => {
  try {
    if (auth.currentUser) await signOut(auth);
    else await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (error) {
    document.getElementById("status").className = "status error";
    document.getElementById("status").textContent = error.message;
  }
});

onAuthStateChanged(auth, user => {
  title.textContent = user ? "Contrôle connecté" : "Connexion requise";
  detail.textContent = user ? `Connecté en tant que ${user.displayName || "contrôleur"}.` : "Connecte-toi pour piloter la roue à distance.";
  button.textContent = user ? "Se déconnecter" : "Se connecter avec Google";
});

window.firebaseRemoteControl = Object.freeze({
  async send(message) {
    if (!auth.currentUser) throw new Error("Connecte-toi avec Google avant de lancer un tirage.");
    const command = {
      ...message,
      id: crypto.randomUUID(),
      sentAt: serverTimestamp(),
      senderUid: auth.currentUser.uid
    };
    await set(ref(database, "wheel/command"), command);
  }
});
