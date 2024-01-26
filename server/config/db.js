const mongoose = require('mongoose')

const dbConnection = () => {
    try {
        mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log('connect success to mongoose')
        })
    } catch (error) {
        console.error(error.message)
    }
}
module.exports = dbConnection