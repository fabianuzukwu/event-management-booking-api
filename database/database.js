const { Sequelize} = require('sequelize')
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME
const host = process.env.HOST
const dbPort = process.env.DB_PORT

const sequelize = new Sequelize(dbName, username, password, {
    host: host,
    dialect: 'mysql',
    port : dbPort
})

module.exports = sequelize