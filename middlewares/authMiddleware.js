const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Check for Authorization header
  const token = req.header('Authorization');
  
  // Ensure the token is present and has the correct format
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract the token from the header
  const bearerToken = token.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
