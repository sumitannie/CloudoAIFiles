import jwt from "jsonwebtoken";

// This middleware protects routes by checking if the user is logged in
const authMiddleware = (req, res, next) => {
  try {
    // 1. Read the Authorization header
    // It should look like: "Bearer <token>"
    const token = req.header("Authorization");

    // If no token → block access
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // 2. Extract the actual token (remove the "Bearer ")
    const actualToken = token.split(" ")[1];

    // 3. Verify the token using JWT_SECRET
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // 4. Attach user ID to req (so controllers know which user is logged in)
    req.userId = decoded.id;

    // 5. Move to the next function (controller)
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export default authMiddleware;
