const ytdl = require("ytdl-core");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
ffmpeg.setFfmpegPath(ffmpegPath);

const convertQualityType = async (quality, type, url, id) => {
  if (quality === "1080" && type === "mp4") await hdVideo(url, id);
  else if (quality === "720" && type === "mp4") await convertmp4sd(url, id);
  else if (quality === "192" && type === "mp3") await convertmp3sd(url, id);
  else await convertmp3hq(url, id);
};

const convertmp4sd = async (url, id) => {
  const promisifyCommand = (command) => {
    return new Promise((resolve, reject) => {
      command.on("end", resolve).on("error", reject).run();
    });
  };
  let stream = ytdl(url, { quality: "highest" });
  let ffmpegFunction = ffmpeg(stream).save(`./public/tmp/${id}.mp4`);
  console.log("Started");
  await promisifyCommand(ffmpegFunction);
  console.log("Ended");
};

const convertmp3hq = async (url, id) => {
  const promisifyCommand = (command) => {
    return new Promise((resolve, reject) => {
      command.on("end", resolve).on("error", reject).run();
    });
  };

  let stream = ytdl(url, {
    quality: "highestaudio",
  });

  let ffmpegFunction = ffmpeg(stream)
    .audioBitrate(320)
    .save(`./public/tmp/${id}.mp3`);
  console.log("Started");
  await promisifyCommand(ffmpegFunction);
  console.log("Ended");
};

const convertmp3sd = async (url, id) => {
  const promisifyCommand = (command) => {
    return new Promise((resolve, reject) => {
      command.on("end", resolve).on("error", reject).run();
    });
  };

  let stream = ytdl(url, {
    quality: "highestaudio",
  });

  let ffmpegFunction = ffmpeg(stream)
    .audioBitrate(192)
    .save(`./public/tmp/${id}.mp3`);
  console.log("Started");
  await promisifyCommand(ffmpegFunction);
  console.log("Ended");
};

module.exports = { convertQualityType };

// https://www.youtube.com/watch?v=Ef_Mmevd8dg
