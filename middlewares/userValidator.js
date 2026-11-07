const Joi = require('joi')

const createUserValidator = (req, res, next) => {
    const userSchema = Joi.object ({
        firstName: Joi.string()
        .trim()
        .regex(/^[A-Za-z]{3,}$/)
        .required()
        .messages({
          "any.required": "First name is required",
          "string.empty": "First name cannot be empty",
          "string.pattern.base":
            "First name must be letters only either lowercase or uppercase and it must be at least 3 characters long.",
        }),
        lastName: Joi.string()
        .trim()
        .regex(/^[A-Za-z]{3,}$/)
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
      phoneNumber: Joi.string().trim().regex(/^\d{10,}$/).required().messages({
            "any.required": "Phone number is required",
            "string.empty": "Phone number must not be empty",
            "string.pattern.base": "Phone number must be digits and must be at least 10 digits long"
        }),
      password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required().messages({
            "any.required": "Password is required",
            "string.empty": "Password must not be empty",
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
        .regex(/^[A-Za-z]{3,}$/)
        .optional()
        .messages({
          "string.empty": "First name cannot be empty",
          "string.pattern.base":
            "First name must be letters only either lowercase or uppercase and it must be at least 3 characters long.",
     }),
     lastName: Joi.string()
        .trim()
        .regex(/^[A-Za-z]{3,}$/)
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
       phoneNumber: Joi.string().trim().regex(/^\d{10,}$/).optional().messages({
            "any.required": "Phone number is required",
            "string.empty": "Phone number must not be empty",
            "string.pattern.base": "Phone number must be digits and must be at least 10 digits long"
        }),
         password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).optional().messages({
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