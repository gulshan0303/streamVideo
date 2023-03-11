
// Auth middleware
exports.auth = async (req, res, next) => {
    try {
      // Get token from header
      const token = req.header('x-auth-token');
      if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
      }
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };
  
  // Error handler middleware
  exports.errorHandler = async (err, req, res, next) => {
    console.error(err.message);
    res.status(500).send('Server error');
  };
  