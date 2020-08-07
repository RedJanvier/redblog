let globalUser = {
  name: "",
  email: "",
  uid: "",
};
window.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector("#logout-btn");

  auth.onAuthStateChanged((user) => {
    if (user) {
      const localVal = JSON.parse(localStorage.getItem("user"));
      if (localVal) return (globalUser = localVal);
      const { email } = user;
      const { email: mail, displayName, uid } = auth.currentUser;
      console.log(`${email} just logged in. Enjoy the best blog ever....`);

      globalUser.email = mail;
      globalUser.name = displayName;
      globalUser.uid = uid;
    } else {
      redirectTo("/");
    }
  });

  logoutBtn.addEventListener("click", () => {
    disableButton(logoutBtn);
    localStorage.clear();
    auth.signOut().catch(console.log);
  });
});
