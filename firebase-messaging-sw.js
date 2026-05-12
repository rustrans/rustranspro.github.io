importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyD9Tiws2tf1rYJuJ83hMJ6q1owJ2iHbMR8",
  authDomain: "my-simple-chat-b59b9.firebaseapp.com",
  databaseURL: "https://my-simple-chat-b59b9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-simple-chat-b59b9",
  storageBucket: "my-simple-chat-b59b9.firebasestorage.app",
  messagingSenderId: "106669535181",
  appId: "1:106669535181:web:678e89c79b063bb03c5e84"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = "Neue Nachricht vom Besucher!";
  const notificationOptions = {
    body: payload.notification?.body || "Jemand hat geschrieben...",
    icon: "" // можно добавить иконку позже
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
