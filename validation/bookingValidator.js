const Joi = require('joi');

const createBookingValidation = (req, res, next) => {
    const schema = Joi.object({
        quantity: Joi.number().integer().min(1).required().messages({
            'any.required': 'Quantity is required',
            'number.base': 'Quantity must be a number',
            'number.integer': 'Quantity must be an integer',
            'number.min': 'Quantity must be at least 1'
        }),
        totalAmount: Joi.number().precision(2).required().messages({
            'any.required': 'Total amount is required',
            'number.base': 'Total amount must be a number',
            'number.precision': 'Total amount must have at most 2 decimal places'
        })
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    next();
}


module.exports = {
    createBookingValidation
}