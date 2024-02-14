const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const jwtpassword = "123456";

const all_users = [
  {
    email: "test1@gmai.com",
    password: "123",
    fname: "test1",
  },
  {
    email: "test2@gmai.com",
    password: "1234",
    fname: "test12",
  },
  {
    email: "test3@gmai.com",
    password: "12345",
    fname: "test123",
  },
];

function userexists(email, password) {
  let userexists = false;
  for (let i = 0; i < all_users.length; i++) {
    if (all_users[i].email == email && all_users[i].password == password) {
      userexists = true;
    }
  }
  return userexists;
}

app.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!userexists(email, password)) {
    res.status(403).send({
      message: "User doesn't exists!",
    });
  }
  var token = jwt.sign({ email: email }, jwtpassword);
  return res.send({
    token,
  });
});

app.get('/users',(req,res)=>{
    const gettoken = req.headers.authorization;
    try {
        const decode = jwt.verify(gettoken,jwtpassword);
        const email = decode.email;
        res.json({
            email : all_users.filter((value)=>{
                if(value.email == email){
                    return false
                }
                else{
                    return true
                }
            })
        })
    } catch (error) {
        res.status(403).send({
            message : "Invalid token"
        })
    }
})

app.listen(3001);
