'use strict';

const { manageError } = require("#helper/response.helper");
const { expressjwt: jwt } = require("express-jwt");
const { findUser } = require("#services/auth.service");

const jwtExpressMiddleware = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  getToken: function fromHeaderOrQuerystring(req) {
    const authorization = req.headers.authorization;
    if (authorization && authorization.split(" ")[0] === "Bearer") {
      return authorization.replace('Bearer ', '');
    }
    else if (req.query && req.query.token) {
      return req.query.token;
    }
    else if (req.body && req.body.token) {
      return req.body.token;
    }
    return null;
  }
});

//JWT Auth
async function jwtAuth(req, res, next) {
  try {
    await jwtExpressMiddleware.apply(this, [req, res, async () => {
      if (!req.auth) {
        return res.generateResponse(401, 'Unauthorized..!');
      }

      if (req.auth && !req.auth.user) return next();

      const user = await findUser({ email: req.auth.user?.email });

      if (!user) {
        return res.generateResponse(400, "Invalid token or Account not found!");
      }

      req.user = user;
      next();
    }]);

  } catch (err) {
    const error = manageError(err);
    res.generateResponse(error.code, error.message);
  }
}

module.exports = {
  jwtAuth
};