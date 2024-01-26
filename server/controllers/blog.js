const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const Blog = require("../models/Blog");
const User = require("../models/user");
const dotenv = require('dotenv').config()

exports.getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await Blog.find({})
        res.status(200).json({ allBlogs, status: true })
    } catch (error) {
        console.error(error.message)
        res.status(error.status).json({ message: error.message })
    }
}
exports.getBlog = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id)
        res.status(200).json({ blog, status: true })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message, status: false })
    }

}
exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params
        // const { title, description, image } = req.body
        const blog = await Blog.findByIdAndUpdate(id, { ...req.body })
        res.status(200).json({ blog, status: true, message: 'Updated successfully' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message, status: false })
    }
}
exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findByIdAndDelete(id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()

        res.status(200).json({ status: true, message: 'deleted successfully', })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message, status: false })
    }
}
exports.createBlog = async (req, res) => {
    try {
        const { title, description, image, user } = req.body
        if (!title || !description || !image) {
            return res.status(404).json({
                message: "cannot find a title or description for this blog"
            })
        }
        const existingUser = await User.findById(user)
        const blog = await Blog({ title, description, image, user })
        existingUser.blogs.push(blog)
        await existingUser.save()
        blog.save()
        res.status(200).json({ success: true, blog, message: "blog created successfully" })
    } catch (error) {
        console.log(error.message)
    }
}
exports.userBlogs = async (req, res) => {
    try {
        const { id } = req.params
        const userBlogs = await User.findById(id).populate("blogs")
        if (userBlogs.length == 0) return res.status(404).json({ status: 404, message: " blog not found" })
        res.status(200).json({ status: 200, message: " blog has been successfully ", userBlogs })
    } catch (error) {
        console.log(error.message)
    }
}