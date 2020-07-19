const express = require('express');
const router = express.Router({mergeParams: true});

router.delete("/", (req, res) => {
  res.json({
    message: "Logging out"
  });
});

module.exports = router;