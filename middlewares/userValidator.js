const Joi = require('joi')

const createUserValidator = (req, res, next) => {
    const userSchema = Joi.object ({
        firstName: Joi.string()
        .trim()
        .pattern(new RegExp("^[A-Za-z]{3,}$"))
        .required()
        .messages({
          "any.required": "First name is required",
          "string.empty": "First name cannot be empty",
          "string.pattern.base":
            "First name must be letters only either lowercase or uppercase and it must be at least 3 characters long.",
        }),
        lastName: Joi.string()
        .trim()
        .pattern(new RegExp("^[A-Za-z]{3,}$"))
        .required()
        .messages({
          "any.required": "Last name is required",
          "string.empty": "Last name cannot be empty",
          "string.pattern.base":
            "Last name must be letters only either lowercase or uppercase and it must be at least 3 characters long.",
        }), 
         email: Joi.string().trim().email().required().messages({
        "any.required": "Email is required",
        "string.empty": "Email cannot be empty",
        "string.email": "Email must be a valid email address",
      }),
      phoneNumber: Joi.string().trim().pattern("^\+?[1-9]\d{1,14}$").required().messages({
            "any.required": "Phone number is required",
            "string.empty": "Phone number must be a digit and a minimum of 14"
        }),
      password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')).required().messages({
            "any.required": "Password is required",
            "string.pattern.base": "Password must contain at least lowercase, uppercase, digit and special character and must be minimum of 8 characters",
    })
    })

     const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    })
  }

  next()
};

const updateUserValidator = (req, res, next) => {
     const userSchema = Joi.object ({
        firstName: Joi.string()
        .trim()
        .pattern(new RegExp("^[A-Za-z]{3,}$"))
        .optional()
        .messages({
          "string.empty": "First name cannot be empty",
          "string.pattern.base":
            "First name must be letters only either lowercase or uppercase and it must be at least 3 characters long.",
     }),
     lastName: Joi.string()
        .trim()
        .pattern(new RegExp("^[A-Za-z]{3,}$"))
        .optional()
        .messages({
          "string.empty": "Last name cannot be empty",
          "string.pattern.base":
            "Last name must be letters only either lowercase or uppercase and it must be at least 3 characters long.",
    }),
    email: Joi.string().trim().email().optional().messages({
        "string.empty": "Email cannot be empty",
        "string.email": "Email must be a valid email address",
      }),
       phoneNumber: Joi.string().trim().pattern("^\+?[1-9]\d{1,14}$").optional().messages({
            "string.empty": "Phone number must be a digit and a minimum of 14"
        }),
         password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')).optional().messages({
            "string.pattern.base": "Password must contain at least lowercase, uppercase, digit and special character and must be minimum of 8 characters",
    })
})

const  { error } = userSchema.validate( req.body );

    if ( error ) {
       return res.status( 400 ).json( {
            message: error.details[ 0 ].message
        } );
    }

    next(); 
}

module.exports = {
    createUserValidator,
    updateUserValidator
}