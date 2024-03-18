import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  // Log the received token for debugging
  console.log("Received Token:", token);

  if (token) {
    // Verify the token using the "secret" key
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.error("Token Verification Error:", err);
        return res.sendStatus(403); // Token verification failed
      }

      // Extract user role (if it exists) and ID from the decoded token
      const { id, role = "" } = decodedToken || {}; // Use empty object as default

      // Attach user information to the request object
      req.user = { id, role };

      // Check if ID exists and then role (optional)
      if (id) {
        if (role === "user" || role === "") {
          // Allow access for any role or no role if ID exists
          next();
        } else {
          console.error("Unauthorized: Insufficient role");
          return res.sendStatus(403); // Forbidden access for other roles (if checking role)
        }
      } else {
        console.error("Unauthorized: Missing ID in token");
        return res.sendStatus(403); // Forbidden access if ID is missing
      }
    });
  } else {
    console.log("Token not provided");
    res.sendStatus(401); // Token not provided
  }
};
