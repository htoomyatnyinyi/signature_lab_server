// import express from "express";
// import { sql_db } from "../db.js";
// import verifyRole from "../middleware/verifyRole.js";
// import verifyToken from "../middleware/verifyToken.js";

// const router = express.Router();

// // Get all users - Admin only
// router.get("/users", verifyRole(["Admin"]), (req, res) => {
//   sql_db.query("SELECT * FROM users", (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(results);
//   });
// });

// // Get a user by ID - Job seekers can see only their own info, Admin can see all
// router.get(
//   "/user/:id",
//   verifyRole(["Admin", "jobSeeker", "Employer"]),
//   (req, res) => {
//     console.log(req.user, "from user/id");
//     const { id } = req.params;
//     const userId = req.user.id;

//     if (req.user.userType === "jobSeeker" && userId !== parseInt(id)) {
//       return res.status(403).json({ message: "Access denied." });
//     }

//     sql_db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       if (results.length === 0) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       res.json(results[0]);
//     });
//   }
// );

// // Get users who applied to employer's job posting - Employer only
// router.get(
//   "/employer/applicants/:jobId",
//   verifyRole(["Employer"]),
//   (req, res) => {
//     const { jobId } = req.params;
//     const employerId = req.user.id;

//     sql_db.query(
//       "SELECT users.* FROM users JOIN applications ON users.id = applications.userId WHERE applications.jobId = ? AND applications.employerId = ?",
//       [jobId, employerId],
//       (err, results) => {
//         if (err) {
//           return res.status(500).json({ error: err.message });
//         }
//         res.json(results);
//       }
//     );
//   }
// );

// // Update a user by ID - Admin or user can update own info
// router.put("/user/:id", verifyRole(["Admin", "jobSeeker"]), (req, res) => {
//   const { id } = req.params;
//   const { username, password, userType, email, phone } = req.body;
//   const userId = req.user.id;

//   if (req.user.userType !== "Admin" && userId !== parseInt(id)) {
//     return res.status(403).json({ message: "Access denied." });
//   }

//   sql_db.query(
//     "UPDATE users SET username = ?, password = ?, userType = ?, email = ?, phone = ? WHERE id = ?",
//     [username, password, userType, email, phone, id],
//     (err, results) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       if (results.affectedRows === 0) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       res.json({ message: "User updated successfully" });
//     }
//   );
// });

// // Delete a user by ID - Admin only
// router.delete("/user/:id", verifyRole(["Admin"]), (req, res) => {
//   const { id } = req.params;

//   sql_db.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     if (results.affectedRows === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json({ message: "User deleted successfully" });
//   });
// });

// export default router;
