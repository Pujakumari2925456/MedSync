const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    // console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT verify error:", err.message);
        return res.status(401).send({
          success: false,
          message: "Token verification failed",
        });
      }

      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.error("authMiddleware error:", error.message);
    res.status(401).send({
      success: false,
      message: "Auth Middleware Failed",
    });
  }
};
