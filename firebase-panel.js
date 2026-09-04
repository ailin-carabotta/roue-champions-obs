import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getDatabase, ref, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const app = initializeApp(window.ROUE_FIREBASE_CONFIG);
const database = getDatabase(app);

window.firebaseRemoteControl = Object.freeze({
  async send(message) {
    const command = {
      ...message,
      id: crypto.randomUUID(),
      sentAt: serverTimestamp()
    };
    await set(ref(database, "wheel/command"), command);
  }
});
