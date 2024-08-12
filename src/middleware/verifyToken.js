// import jwt from "jsonwebtoken";

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header

//   if (!token) {
//     return res
//       .status(403)
//       .json({ message: "A token is required for authentication" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with your secret key
//     req.user = decoded; // Save the decoded user information in the request
//     console.log(`TOKEN_CHECK_: ${req.user}`, req.user);
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid Token" });
//   }

//   return next(); // Call the next middleware or route handler
// };

// export default verifyToken;

// import jwt from "jsonwebtoken";

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header

//   if (!token) {
//     return res
//       .status(403)
//       .json({ message: "A token is required for authentication" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with your secret key
//     req.user = decoded; // Save the decoded user information in the request
//     console.log(req.user, "at vt");
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid Token" });
//   }

//   return next(); // Call the next middleware or route handler
// };

// export default verifyToken;

// // import jwt from "jsonwebtoken";

// // const verifyToken = (req, res, next) => {
// //   const token = req.headers["authorization"];
// //   if (!token) {
// //     return res.status(403).json({ message: "No token provided" });
// //   }

// //   jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
// //     if (err) {
// //       return res.status(500).json({ message: "Failed to authenticate token" });
// //     }
// //     // Save the user ID for use in other routes
// //     req.userId = decoded.id;
// //     next();
// //   });
// // };

// // export default verifyToken;
// // // THIS CODE IS MODIFIED FOR SPECIFIC TOKEN TO ACCESS SPECIFIC DATA
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err && err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized: Token expired" });
    }
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    req.user = decoded;
    console.log("JWT_SUCCESSED_ _>", req.user);
    next();
  });
};

export default verifyToken;
