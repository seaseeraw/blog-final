export const consoleMiddleWare = (req, res, next) => {
  console.log("CONSOLING MIDDLEWARE", req.query);

  next();
};
