const express = require('express');
const router = express.Router({mergeParams: true});
import {SESS_NAME} from "../../../config/config";

router.delete("/", (req, res) => {
  const {session} = req;
  try {
    const user = session.user;
    if (user) {
      session.destroy(err => {
        if (err) throw (err);
        res.clearCookie(SESS_NAME);
        return res.status(200).json({
          success: true,
          user
        });
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to remove session!"
      });
    }
  } catch (err) {
    return res.status(422).json({
      success: false,
      message: err.message,

    });
  }
});

module.exports = router;