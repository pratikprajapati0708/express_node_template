const { Admin } = require("../db/index"); //Importing Admin DB
// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const username = req.headers.username;
  const password = req.headers.password;

  //checking in if the user is there in admin table in db
  Admin.findOne({
    username : username,
    password : password
  })
  .then(function(value){
    if(value){
        next();
    }else{
        res.status(403).json({
            message : "Admin doesn't exists"
        })
    }
  })
}

module.exports = adminMiddleware;
