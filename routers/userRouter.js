const express = require('express')
const router = express.Router()

const {createUser, getAllUsers, getOneUser, updateUser, deleteUser} = require('../controllers/userController.js')
const { createUserValidator, updateUserValidator} = require('..validation/userValidator.js')

router.post('/users',createUserValidator, createUser)
router.get('/allUsers', getAllUsers)
router.get('/oneUser/:id', getOneUser)
router.put('/updateUser/:id',updateUserValidator, updateUser)
router.delete('/deleteUser/:id', deleteUser)

module.exports = router