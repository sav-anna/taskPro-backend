const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  
  if (bearer !== "Bearer" ) {
    next(HttpError(401,'Invalid type of token'));
  };
  if (!token ) {
    next(HttpError(401,'Token not provided'));
  };

  try {
    const payload = jwt.verify(token, SECRET_KEY)
    if (payload.type !== 'access') {
      return res.status(401).json({ message: 'Invalid token' })
    }
    
    const user = await User.findById(payload.userId)
    req.user = user;
       
  }  catch (error) {
    if(error instanceof jwt.TokenExpiredError){
        next(HttpError(401, "Expired token"));
    } else if (error instanceof jwt.JsonWebTokenError){
        next(HttpError(401, "Invalid token"));
    } else {
      next(error);
    }
  }
      next();
  };

module.exports = authenticate;
