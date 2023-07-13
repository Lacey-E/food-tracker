const redis = require('redis');
const JWTR = require('jwt-redis').default;
const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);

const jwtAuthMiddleware = async (req, res, next) => {
  const token = req.header('auth-token');

  // IN CASE THE TOKEN DOESN'T EXIST
  if (!token || token === '') {
    req.isAuth = false;
    return next(); // Call the next middleware or route handler
  }

  try {
    const verified = await jwtr.verify(token, process.env.SECRET_TOKEN);
    // IN CASE TOKEN EXISTS AND VALID
    req.user = verified;
    req.isAuth = true;
    next(); // Call the next middleware or route handler
  } catch (err) {
    // IN CASE TOKEN EXISTS BUT INVALID
    req.isAuth = false;
    next(err); // Pass the error to the error handler
  }
};

module.exports = jwtAuthMiddleware;

