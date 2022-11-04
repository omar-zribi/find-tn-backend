const { check, validationResult } = require("express-validator");

exports.userSingUpRules = () => [ 
    check("userName", "this field is require").notEmpty(),

    check("userSex", "this field is require").notEmpty(),
    
    check("email", "this field is require").notEmpty(),
    check("email", "this field is require").isEmail(),
    
    check("etabOrigin", "this field is require").notEmpty(),
    
    check("gouvernerat", "this field is require").notEmpty(),
    
    check("posteAcctuel", "this field is require").notEmpty(),

    check("password", "password should be more than 7 digets").isLength({min:7,max:100}),
   
  ];
  
  exports.userSingUpdValidator = (req, res, next) => {
    const errors = validationResult(req);
    return errors.isEmpty()
      ? next()
      : res.status(400).json({ errors: errors.array() });
  };
  