// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

// Paste the same firebaseConfig from /lib/firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyCMiXM8hRW9jdebTrcKJRiJP8U0GUsk1Xw",
  authDomain: "rusharena-2ee93.firebaseapp.com",
  projectId: "rusharena-2ee93",
  storageBucket: "rusharena-2ee93.firebasestorage.app",
  messagingSenderId: "524879024785",
  appId: "1:524879024785:web:bceec5fa8921c695c2a530",
  measurementId: "G-CNS22FJ7W0",
};

// Initialize Firebase in service worker
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Optional: handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/images/logo.jpg",
  });
});
