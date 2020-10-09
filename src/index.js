const express = require("express");
const app = express();
const path = require("path");
const ytdl = require("ytdl-core");
const convert = require("./convert");
const { createIdRoute, deleteIdRoute } = require("./status");
const uuid = require("uuid-random");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/download", async (req, res) => {
  let id = uuid();

  const info = await ytdl.getBasicInfo(req.body.url);
  const video = {
    title: info.videoDetails.title,
    owner: info.videoDetails.ownerChannelName,
    videoID: info.videoDetails.videoId,
  };
  res.render("download.ejs", { video, id });
  await convert(req.body.url, video.title, video.videoID);

  deleteIdRoute(app, id);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on: ${process.env.PORT || 3000}`);
});
