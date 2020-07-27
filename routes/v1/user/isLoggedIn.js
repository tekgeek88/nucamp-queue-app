import express from 'express';

const router = express.Router({mergeParams: true});

router.get("/", ({ session: { user }}, res) => {
  if (user) {
    res.status(200).json({
      success: true,
      isLoggedIn: true,
      user
    });
  } else {
    res.status(204).send({
      success: false,
      isLoggedIn: false,
      message: "User is not logged in!"
    });
  }
});

module.exports = router;