const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require("./routes/auth")
const blogRoutes = require("./routes/blog")
const dbConnection = require('./config/db')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(authRouter)
app.use(blogRoutes)

dbConnection()
const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log('listening on port ' + PORT))