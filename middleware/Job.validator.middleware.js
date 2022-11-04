const { check, validationResult } = require("express-validator");

exports.AddJobRules = () => [ 
    check("userName", "this field is require").notEmpty(),

    check("fullUserName", "this field is require").notEmpty(),
    
    check("userSex", "this field is require").notEmpty(),
    
    check("etabOrigin", "this field is require").notEmpty(),
    
    check("gouvernerat", "this field is require").notEmpty(),

    check("posteAcctuel", "this field is require").notEmpty(),
    
    check("email", "this field is require").notEmpty(),
    check("email", "this field is require").isEmail(),

    check("description", "password should be more than 250 digets").isLength({min:0,max:1000}),
   
  ];
  
  exports.AddJobValidator = (req, res, next) => {
    const errors = validationResult(req);
    return errors.isEmpty()
      ? next()
      : res.status(400).json({ errors: errors.array() });
  };
  