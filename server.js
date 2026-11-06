require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT 
const sequelize = require('./database/database')

app.use(express.json())

const dbConnection = async () => {
    try {
       await sequelize.authenticate() 
       console.log('Connection has been established successfully')
       
       app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`)
       })
    } catch (error) {
        console.log('Unable to connect to the database', error.message)
    }
}

dbConnection()




