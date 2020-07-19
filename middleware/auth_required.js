// const config = require("../config/config");
//
module.exports = function (req, res, next) {
  const session = req.session;
  if (!session.user) {
    return res.status(401).send({message: "You must be logged in to do that!"});
  } else {
    next();
  }
};