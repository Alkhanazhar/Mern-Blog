
const User = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const dotenv = require('dotenv').config()


exports.allUsers = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).send(user);
    } catch (error) {
        console.error(error.message);
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email) { return res.json({ message: 'Please enter an email address' }); }
    if (!password) { return res.json({ message: 'Please enter your password' }); }
    const user = await User.findOne({ email });
    if (!user) { return res.json({ message: ' Please enter your correct email address' }); } const compare = await bcrypt.compare(password, user.password)

    if (!compare) {
        return res.status(400).json({ message: "password doesn't matched", ok: false })
    }

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    res.status(200).json({ message: " succesfully logged in", token, user, ok: true })
}
exports.register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (!email) { return res.json({ message: 'Please enter an email address' }); }
        if (!name) { return res.json({ message: 'Please enter your username' }); }
        if (!password) { return res.json({ message: 'Please enter your password' }); }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.json({ message: 'user already exists', status: false });
        }

        const salt = 10
        const user = await User.create({ name, email, password: await bcrypt.hash(password, salt) })
        res.status(200).json({ message: "User created successfully", user, success: true })
    } catch (error) {
        console.log(error.message)
    }
}
exports.userProfile = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
    }

}