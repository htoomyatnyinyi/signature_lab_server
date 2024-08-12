// // src/middleware/verifyRole.js
// import jwt from "jsonwebtoken";

// const verifyRole = (allowedRoles) => (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   //   console.log("CHECK TOKEN HERE", token);

//   if (!token) {
//     return res
//       .status(403)
//       .json({ message: "A token is required for authentication" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("CHECK USERYTPE HERE", decoded.userType);
//     // req.user = decoded;
//     req.user = decoded;

//     if (!allowedRoles.includes(req.user.userType)) {
//       return res.status(403).json({ message: "Access denied." });
//     }

//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid Token" });
//   }
// };

// export default verifyRole;
