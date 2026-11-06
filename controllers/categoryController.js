const { Category } = require('../models')

const createCategory = async (req, res) => {
    try {
        const { name, description} = req.body
        const category = await Category.findOne({where: {name}})
        
        if (category) {
            return res.status(400).json({
                message: `Category with name: ${name} already exists`
            })
        }

        const newCategory = await Category.create({
            name,
            description
        })

        res.status(201)
    } catch (error) {
       res.status(500).json({
        message: error.message
       })
    }
}