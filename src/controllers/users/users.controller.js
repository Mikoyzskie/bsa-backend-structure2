const express = require("express");
const userService = require("../services/userService");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/:id", userService.getUserById);
router.post("/", userService.createUser);
router.put("/:id", authMiddleware.authenticate, userService.updateUser);

module.exports = router;
