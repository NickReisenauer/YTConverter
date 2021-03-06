const express = require("express");
const app = express();
const path = require("path");
const ytdl = require("ytdl-core");
const { convertQualityType } = require("./convert");
const {
  createIdRouteFalse,
  createIdRouteTrue,
  deleteIdRoute,
  deleteIdRouteTimeout,
} = require("./status");
const uuid = require("uuid-random");
const cronjob = require("./cron");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/download", async (req, res) => {
  let id = uuid();

  createIdRouteFalse(app, id);

  const info = await ytdl.getBasicInfo(req.body.url);

  const video = {
    title: info.videoDetails.title,
    owner: info.videoDetails.ownerChannelName,
    videoID: info.videoDetails.videoId,
    userID: id,
    type: req.body.radio,
  };
  res.render("download.ejs", { video, id });

  await convertQualityType(req.body.quality, req.body.radio, req.body.url, id);

  deleteIdRoute(app, id);
  createIdRouteTrue(app, id);
  deleteIdRouteTimeout(app, id);
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Listening on: ${process.env.PORT || 3001}`);
});

cronjob();
