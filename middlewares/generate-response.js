


module.exports = function (req, res, next) {
  res.generateResponse = function (statusCode, message = '', data = '') {
    let responseObject = {};
    responseObject.data = data;
    responseObject.message = message;
    return this.status(statusCode).json(responseObject);
  };
  next();
};
