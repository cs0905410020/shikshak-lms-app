import JWT from 'jsonwebtoken';
import dotenv  from 'dotenv';
dotenv.config();
const authToken = async (req, res, next) => {

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ message: "Token required" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"
  if (!token) {
    return res.status(403).json({ message: "Malformed token" });
  }
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Access token expired" });
    }

    // Extract the user ID from the token
    req.user = user; // user object will have id and email fields
    next();
  });
};

export default authToken;
