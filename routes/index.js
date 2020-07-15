const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const join_club_controller = require('../controllers/joinClubController');
const login_controller = require('../controllers/loginController');
const message_controller = require('../controllers/messageController');

/* GET home page. */
router.get('/', message_controller.messages_display_get);

router.get('/sign-up', user_controller.user_create_get);

router.post('/sign-up', user_controller.user_create_post);

router.get('/join-club', join_club_controller.join_club_get);

router.post('/join-club', join_club_controller.join_club_post);

router.get('/login', login_controller.login_get);

router.post('/login', login_controller.login_post);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get('/create-message', message_controller.message_create_get);

router.post('/create-message', message_controller.message_create_post);

module.exports = router;
