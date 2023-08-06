const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  
  if (bearer !== "Bearer" || !token) {
    next(HttpError(401));
  }

  try {
    // const { id } = jwt.verify(token, SECRET_KEY);
    // const user = await User.findById(id);
    // if (!user || !user.token || user.token !== token) {
    //   next(HttpError(401));
    const payload = jwt.verify(token, SECRET_KEY)
    if (payload.type !== 'access') {
      return res.status(401).json({ message: 'Invalid token' })
    }
    console.log("payload.userId: ", payload.userId);
    const user = await User.findById(payload.userId)
    req.user = user;
       
  } catch {
    next(HttpError(401));
  }
  next();
};

module.exports = authenticate;
