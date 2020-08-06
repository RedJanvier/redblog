const db = firebase.firestore();
const storageRef = firebase.storage().ref();

let file;
const createForm = document.querySelector(".create-form");
const previewImage = createForm.querySelector(".img-preview");
const createBtn = createForm.submit;
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  disableButton(createBtn);
  const metadata = {
    "content-type": "image/x-jpeg",
  };
  const uploadTask = storageRef
    .child("post-images/" + file.name)
    .put(file, metadata);

  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      createBtn.textContent = "Upload is " + progress + "% done";
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          localStorage.clear();
          auth.signOut().catch(console.log);
          window.location.href = "/";
          break;
      }
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        const { email, displayName, photoURL, uid } = JSON.parse(
          localStorage.getItem("user")
        );
        const blogData = {
          title: createForm.title.value.trim(),
          body: createForm.body.value.trim(),
          authorName: displayName,
          authorProfile: photoURL,
          authorEmail: email,
          authorUid: uid,
          image: downloadURL,
        };
        db.collection("posts")
          .add(blogData)
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            setTimeout(() => (window.location.href = "/pages/home.html"), 800);
          })
          .catch(console.log);
      });
    }
  );
});

createForm.image.addEventListener("change", showPreviewImg);

function showPreviewImg(e) {
  previewImage.innerHTML = "";
  file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const preview = document.createElement("img");
      preview.setAttribute("src", reader.result);

      return previewImage.appendChild(preview);
    });

    reader.readAsDataURL(file);
  }
}
