// const config = require("../config/config");
//
export default function (req, res, next) {
  const session = req.session;
  if (!session.user) {
    return res.status(401).json({
      success: false,
      message: "You must be logged in to do that!"}
      );
  } else {
    next();
  }
}