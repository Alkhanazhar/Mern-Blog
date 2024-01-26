const express = require('express');
const User = require('../models/user');

const { allUsers, login, register, userProfile } = require('../controllers/auth');

const router = express.Router()
router.post('/register', register)
router.post("/login", login)
router.get("/all-users", allUsers)
router.get("/profile/:id", userProfile)

module.exports = router
