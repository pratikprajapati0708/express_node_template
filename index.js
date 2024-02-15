const jwt = require("jsonwebtoken");
const jwtpassword = "secret";
const zod = require("zod");

//verification condition
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username, password) {
  const userresponse = emailSchema.safeParse(username);
  const passwordresponse = passwordSchema.safeParse(password);
  if (!userresponse && !passwordresponse) {
    return null;
  }
  const signature = jwt.sign({ username }, jwtpassword);
  return signature;
}

//decode the jwt
function decodeJwt(token) {
  const decode = jwt.decode(token);
  if (decode) {
    return true;
  } else {
    return false;
  }
}

//veryfying jwt

function verifyJwt(token) {
  let isFlag = true;
  try {
    jwt.verify(token, jwtpassword);
  } catch (error) {
    isFlag = false;
  }
  return isFlag;
}
