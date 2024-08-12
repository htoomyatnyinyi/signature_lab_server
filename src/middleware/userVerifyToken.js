// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// const jwtSecretKey = process.env.JWT_SECRET;

// const userVerifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res
//       .status(401)
//       .json({ error: "Unauthorized: Missing or invalid token" });
//   }

//   const token = authHeader.split(" ")[1];

//   jwt.verify(token, jwtSecretKey, (err, decoded) => {
//     if (err && err.name === "TokenExpiredError") {
//       return res.status(401).json({ error: "Unauthorized: Token expired" });
//     }
//     if (err) {
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }
//     // console.log(decoded, "from a token");

//     // req.id = decoded;
//     req.userId = decoded;

//     console.log("JWT_SUCCESSED_for AllUsers_>", req.userId);
//     next();
//   });
// };

// export default userVerifyToken;
