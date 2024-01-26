const express = require('express');
const { createBlog, deleteBlog, updateBlog, getBlog, getAllBlogs, userBlogs } = require('../controllers/blog');

const router = express.Router()

router.get("/all-blogs", getAllBlogs)
router.get("/all-blogs/:id", getBlog)
router.put("/update-blogs/:id", updateBlog)
router.delete("/delete-blogs/:id", deleteBlog)
router.post("/create-blogs", createBlog)
router.get("/user-blogs/:id", userBlogs)


module.exports = router
