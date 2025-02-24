import jwt from "jsonwebtoken";

import config from "../config/config.js";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    var user = jwt.verify(token, config.secretKey);
    req.user = user; // add the decoded user info to the request object
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
