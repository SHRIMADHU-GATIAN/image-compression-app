import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseConfig = {
  apiKey: "AIzaSyBpzJX9sV9xLtGL0ZrckaXDQBdQttX9aiY",
  authDomain: "image-compression-app-dcb2e.firebaseapp.com",
  projectId: "image-compression-app-dcb2e",
  storageBucket: "image-compression-app-dcb2e.appspot.com",
  messagingSenderId: "1043042418494",
  appId: "1:1043042418494:web:a43b42d5af5862d0d7766f",
  measurementId: "G-FXN55YHJPR"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

const imageInput = document.getElementById("imageInput");
const uploadBtn = document.getElementById("uploadBtn");
const statusText = document.getElementById("status");
const downloadLink = document.getElementById("downloadLink");

uploadBtn.addEventListener("click", async () => {
  const file = imageInput.files[0];
  if (!file) {
    alert("Please select an image first.");
    return;
  }

  statusText.textContent = "Compressing image...";

  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options);

    statusText.textContent = "Uploading to Firebase...";

    const storageRef = storage.ref(compressed_images/${Date.now()}_${compressedFile.name});
    await storageRef.put(compressedFile);

    const url = await storageRef.getDownloadURL();
    downloadLink.href = url;
    downloadLink.textContent = "Download Compressed Image";
    downloadLink.style.display = "inline";
    statusText.textContent = "Upload successful!";
  } catch (error) {
    console.error("Error:", error);
    statusText.textContent = "Error occurred!";
  }
});