const firebaseConfig = {
  apiKey: "AIzaSyDAUhE4YknCoDYXfd83shdVlV3PU-XIbEU",
  authDomain: "redblog-f0c61.firebaseapp.com",
  databaseURL: "https://redblog-f0c61.firebaseio.com",
  projectId: "redblog-f0c61",
  storageBucket: "redblog-f0c61.appspot.com",
  messagingSenderId: "41489891615",
  appId: "1:41489891615:web:2118495b5c8aec893f302a",
  measurementId: "G-7XTCHJL89R",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
function disableButton(btn) {
  return (btn.disabled = "disabled");
}
function enableButton(btn) {
  return (btn.disabled = "");
}
function redirectTo(path) {
  return (location.href = location.href.includes("github")
    ? `/redblog${path}`
    : path);
}
