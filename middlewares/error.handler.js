// Error handler to display the error as HTML
// eslint-disable-next-line no-unused-vars, no-shadow
module.exports = function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.send(`<h1>${err.status || 500} Error</h1>` + `<pre>${err.message}</pre>`);
};
