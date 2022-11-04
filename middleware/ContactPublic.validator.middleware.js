const { check, validationResult } = require("express-validator");

exports.SendContactPublicRules = () => [ 
    check("fullName", "this field is require").notEmpty(),
    
    check("email", "this field is require").notEmpty(),
    check("email", "this field is require").isEmail(),

    check("Message", "password should be more than 250 digets").isLength({min:1,max:250}),
   
  ];
  
  exports.SendContactPublicValidator = (req, res, next) => {
    const errors = validationResult(req);
    return errors.isEmpty()
      ? next()
      : res.status(400).json({ errors: errors.array() });
  };
  