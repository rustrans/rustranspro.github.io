// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD9Tiws2tf1rYJuJ83hMJ6q1owJ2iHbMR8",
  authDomain: "my-simple-chat-b59b9.firebaseapp.com",
  projectId: "my-simple-chat-b59b9",
  messagingSenderId: "106669535181",
  appId: "1:106669535181:web:678e89c79b063bb03c5e84"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: icon || '/icon.png',
    click_action: 'https://yourdomain.com/admin.html'
  });
});
