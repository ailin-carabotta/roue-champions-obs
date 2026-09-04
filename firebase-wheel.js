import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getDatabase, onValue, ref } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const app = initializeApp(window.ROUE_FIREBASE_CONFIG);
const database = getDatabase(app);
let lastCommandId = sessionStorage.getItem("last-wheel-command") || "";
const loadedAt = Date.now();

onValue(ref(database, "wheel/command"), snapshot => {
  const command = snapshot.val();
  if (!command?.id || command.id === lastCommandId) return;
  const sentAt = typeof command.sentAt === "number" ? command.sentAt : 0;
  if (sentAt && sentAt < loadedAt - 5000) {
    lastCommandId = command.id;
    sessionStorage.setItem("last-wheel-command", command.id);
    return;
  }
  lastCommandId = command.id;
  sessionStorage.setItem("last-wheel-command", command.id);
  if (command.type === "champion-carousel:spin") window.championCarousel?.spin(command);
});
