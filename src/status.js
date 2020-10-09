const removeRoute = require("remove-route-runtime");

const createIdRoute = async (app, id) => {
  await app.get(`/download/${id}/done`, (req, res) => {
    res.json({ status: false });
  });
};

const deleteIdRoute = (app, id) => {
  app.get(`/download/${id}/done`, (req, res) => {
    res.json({ status: true });
  });
  setTimeout(() => {
    removeRoute(app, `/download/${id}/done`, "GET");
    console.log("Removed");
  }, 2500);
};

module.exports = { createIdRoute, deleteIdRoute };
