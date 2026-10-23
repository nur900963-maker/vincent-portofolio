module.exports = (req, res) => {
  res.setHeader("Cache-Control", "s-maxage=60");
  res.json(require("../config.js").site);
};
