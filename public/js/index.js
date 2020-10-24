document.querySelector("button").addEventListener("click", () => {
  document.querySelector("#convertIcon").classList.toggle("rotateIcon");
});

const mp3radio = document.getElementById("mp3radio");
mp3radio.addEventListener("click", () => {
  mp3quality.classList.remove("hide");
  mp4quality.classList.add("hide");
});
const mp4radio = document.getElementById("mp4radio");
mp4radio.addEventListener("click", () => {
  mp3quality.classList.add("hide");
  mp4quality.classList.remove("hide");
});

const mp3quality = document.getElementById("mp3quality");
const mp4quality = document.getElementById("mp4quality");
