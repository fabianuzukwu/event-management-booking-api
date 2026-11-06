const Joi = require('joi');

const createCategoryValidator = ( req, res, next ) => {
    const schema = Joi.object( {
        name: Joi.string().trim().regex(/^[a-zA-Z\s]{3,}$/).required().messages( {
            'any.required': 'Name is required',
            'string.empty': 'Name cannot be empty',
            'string.pattern.base': 'Name must be at least 3 characters long, start and end with letters, and contain only letters and spaces.'
        } ),
        description: Joi.string().trim().regex(/^[a-zA-Z\s]{3,}$/).optional().messages( {
            'string.empty': 'Description cannot be empty',
            'string.pattern.base': 'Description must be at least 3 characters long, start and end with letters, and contain only letters and spaces.'
        } )
    } );

    const { error } = schema.validate( req.body );

    if ( error ) {
        return res.status( 400 ).json( {
            message: error.details[ 0 ].message
        } );
    }

    next()
};


const updateCategoryValidator = ( req, res, next ) => {
    const schema = Joi.object( {
        name: Joi.string().trim().regex(/^[a-zA-Z\s]{3,}$/).optional().messages( {
            'string.empty': 'Name cannot be empty',
            'string.pattern.base': 'Name must be at least 3 characters long, start and end with letters, and contain only letters and spaces.'
        } ),
        description: Joi.string().trim().regex(/^[a-zA-Z\s]{3,}$/).optional().messages( {
            'string.empty': 'Description cannot be empty',
            'string.pattern.base': 'Description must be at least 3 characters long, start and end with letters, and contain only letters and spaces.'
        } )
    } );

    const { error } = schema.validate( req.body );

    if ( error ) {
       return res.status( 400 ).json( {
            message: error.details[ 0 ].message
        } );
    }

    next();
};
module.exports = {
    createCategoryValidator,
    updateCategoryValidator
};