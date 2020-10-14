const removeRoute = require("remove-route-runtime");

const createIdRouteFalse = (app, id) => {
  app.get(`/download/${id}/done`, (req, res) => {
    res.json({ status: false });
  });
};

const createIdRouteTrue = (app, id) => {
  app.get(`/download/${id}/done`, (req, res) => {
    res.json({ status: true });
  });
};

const deleteIdRoute = (app, id) => {
  removeRoute(app, `/download/${id}/done`, "GET");
};

const deleteIdRouteTimeout = (app, id) => {
  app.get(`/download/${id}/done`, (req, res) => {
    res.json({ status: true });
  });
  setTimeout(() => {
    removeRoute(app, `/download/${id}/done`, "GET");
    console.log("Removed");
  }, 2500);
};

module.exports = {
  createIdRouteFalse,
  createIdRouteTrue,
  deleteIdRoute,
  deleteIdRouteTimeout,
};
