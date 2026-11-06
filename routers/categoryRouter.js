const express = require('express')
const router = express.Router()
const { createCategory, getAllCategory, getOneCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')
const { createCategoryValidator, updateCategoryValidator} = require('../validation/categoryValidator')

router.post('/categories', createCategoryValidator, createCategory)
router.get('/categories', getAllCategory)
router.get('/categories/:id', getOneCategory)
router.put('/categories/:id', updateCategoryValidator ,updateCategory)
router.delete('/categories/:id', deleteCategory)

module.exports = router