const express = require("express");
const router = express.Router();

const { login, register, deleteUser, updateUser } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.route('/modify').delete(deleteUser).patch(updateUser)

module.exports = router;