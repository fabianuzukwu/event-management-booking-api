require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT 
const sequelize = require('./database/database')
const categoryRouter = require('./routers/categoryRouter')
const userRouter = require('./routers/userRouter')
// const eventRouter = require('./routers/eventRouter')
const bookingRouter = require('./routers/bookingRouter')

app.use(express.json())
app.use(categoryRouter)
app.use(userRouter)
// app.use(eventRouter)
app.use(bookingRouter)

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




