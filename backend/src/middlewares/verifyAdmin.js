import jwt from "jsonwebtoken";

export const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid or expired token",
        });
      }

      if (decoded.role !== "admin") {
        return res.status(403).json({
          message: "Unauthorized",
        });
      }

      req.admin = decoded;
      next();
    });
  } catch (err) {
    next(err);
  }
};
