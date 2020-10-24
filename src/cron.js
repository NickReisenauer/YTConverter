const cron = require("node-cron");
const findRemoveSync = require("find-remove");

const cronjob = () => {
  cron.schedule("* * * * *", () => {
    findRemoveSync("./public/", {
      age: { seconds: 1500 },
      extensions: ".mp3",
    });
  });
  cron.schedule("* * * * *", () => {
    findRemoveSync("./public/", {
      age: { seconds: 1500 },
      extensions: ".mp4",
    });
  });
};

module.exports = cronjob;
