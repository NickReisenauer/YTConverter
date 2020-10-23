const ytdl = require("ytdl-core");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const convert = async (url, title, id) => {
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

const convertVideo = async (url, id) => {
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

module.exports = { convert, convertVideo };

// https://www.youtube.com/watch?v=Ef_Mmevd8dg
