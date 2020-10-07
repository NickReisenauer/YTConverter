const ytdl = require("ytdl-core");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const convert = async (url, title, videoID) => {
  const promisifyCommand = (command) => {
    return new Promise((resolve, reject) => {
      command.on("end", resolve).on("error", reject).run();
    });
  };

  let stream = ytdl(url, {
    quality: "highestaudio",
  });

  let ffmpegFunction = ffmpeg(stream)
    .audioBitrate(128)
    .save(`./public/tmp/${title}.mp3`);
  console.log("Started");
  await promisifyCommand(ffmpegFunction);
  console.log("Ended");
};

module.exports = convert;

// https://www.youtube.com/watch?v=Ef_Mmevd8dg
