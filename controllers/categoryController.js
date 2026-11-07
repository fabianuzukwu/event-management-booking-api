const { Category, Event } = require( '../models' );

const createCategory = async ( req, res ) => {
    try {
        const { name, description } = req.body;
        const category = await Category.findOne( { where: { name } } );

        if ( category ) {
            return res.status( 400 ).json( {
                message: `Category with name: ${ name } already exists`
            } );
        }

        const newCategory = await Category.create( {
            name,
            description
        } );

        res.status( 201 ).json( {
            message: 'Category created successfully',
            data: newCategory
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

const getAllCategory = async ( req, res ) => {
    try {
        const categories = await Category.findAll();

        res.status( 200 ).json( {
            message: `All Categories in the database, the Total is ${ categories.length }`,
            data: categories
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

const getOneCategory = async ( req, res ) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk( id, {
            attributes: [ 'name', 'description' ],
            include: {
                model: Event,
                as: 'events',
                attributes: [ 'title', 'description', 'location', 'date', 'ticketPrice' ]
            }
        } );

        if ( !category ) {
            return res.status( 404 ).json( {
                message: 'category not found'
            } );
        }
        res.status( 200 ).json( {
            message: 'Category found',
            data: category
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

const updateCategory = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const category = await Category.findByPk( id );


        if ( !category ) {
            return res.status( 404 ).json( {
                message: 'Category not found'
            } );
        }

        if ( name ) {
            const categoryName = await Category.findOne( { where: { name } } );
            if ( categoryName ) {
                return res.status( 400 ).json( {
                    message: `category with the name: ${ name } already exists`
                } );
            }
        }

        const updatedCategory = await category.update( {
            name,
            description
        } );

        res.status( 200 ).json( {
            message: 'Category has been updated successfully',
            data: updatedCategory
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

const deleteCategory = async ( req, res ) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk( id );

        if ( !category ) {
            return res.status( 404 ).json( {
                message: 'Category not found'
            } );
        }

        await category.destroy();

        res.status( 200 ).json( {
            message: 'Category deleted successfully'
        } );

    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

module.exports = {
    createCategory,
    getAllCategory,
    getOneCategory,
    updateCategory,
    deleteCategory
};