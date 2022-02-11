const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// const auth = require("../../../middleware/auth");
// const jwt = require("jsonwebtoken");
const config = require("config");


router.get('/', (req,res) => res.send('posts router'));

module.exports = router;