const cron = require("node-cron");
const findRemoveSync = require("find-remove");

const cronjob = () => {
  cron.schedule("* * * * *", () => {
    findRemoveSync("./public/", {
      age: { seconds: 1800 },
      extensions: ".mp3",
    });
  });
};

module.exports = cronjob;
