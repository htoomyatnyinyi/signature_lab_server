import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const sql_db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

sql_db.connect((err) => {
  if (err) {
    console.error("ERROR CONNECTING TO THE DATABASE:", err.stack);
    return;
  }

  console.log(
    "CONNECTED TO THE MYSQL DATABASE:",
    process.env.DB_DATABASE,
    "NETWORK",
    sql_db.threadId
  );

  // Create and switch to the new database, then create tables
  sql_db.query(`CREATE DATABASE IF NOT EXISTS job_db;`, (err, result) => {
    if (err) {
      console.error("ERROR CREATING DATABASE:", err);
      return;
    }

    sql_db.changeUser({ database: "job_db" }, (err) => {
      if (err) {
        console.error("ERROR SWITCHING DATABASE:", err);
        return;
      }

      // Create the 'users' table
      sql_db.query(
        `CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL UNIQUE,
          email VARCHAR(255) NULL UNIQUE,
          phone VARCHAR(20) NULL,
          password VARCHAR(255) NOT NULL,
          userType ENUM('jobSeeker', 'Employer', 'Admin') NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`,
        (err, result) => {
          if (err) {
            console.error("ERROR CREATING TABLE 'users':", err);
            return;
          }
        }
      );

      // Create the 'job_postings' table
      sql_db.query(
        `CREATE TABLE IF NOT EXISTS job_postings (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          requirements TEXT,
          salary DECIMAL(10,2),
          location VARCHAR(100),
          employer_id INT,
          FOREIGN KEY (employer_id) REFERENCES users(id),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`,
        (err, result) => {
          if (err) {
            console.error("ERROR CREATING TABLE 'job_postings':", err);
            return;
          }
        }
      );

      // Additional table creation for 'posts', 'responsibilities', and 'requirements'
      sql_db.query(
        `CREATE TABLE IF NOT EXISTS posts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          salary VARCHAR(255),
          location VARCHAR(255),
          address VARCHAR(255),
          company VARCHAR(255),
          category VARCHAR(255),
          employmentType VARCHAR(255),
          posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )`,
        (err, result) => {
          if (err) {
            console.log("ERROR CREATING TABLE ", err);
            return;
          }
        }
      );
      sql_db.query(
        `CREATE TABLE IF NOT EXISTS responsibilities (
          id INT AUTO_INCREMENT PRIMARY KEY,
          post_id INT NOT NULL,
          responsibility TEXT NOT NULL,
          FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
          )`,
        (err, result) => {
          if (err) {
            console.log("ERROR CREATING TABLE ", err);
            return;
          }
        }
      );
      sql_db.query(
        `CREATE TABLE IF NOT EXISTS requirements (
          id INT AUTO_INCREMENT PRIMARY KEY,
          post_id INT NOT NULL,
          requirement TEXT NOT NULL,
          FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
          )`,
        (err, result) => {
          if (err) {
            console.log("ERROR CREATING TABLE ", err);
            return;
          }
        }
      );
    });
  });
});

export { sql_db };

// UPDATE FOR ALL OF THIS CODE ...
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

// import mysql from "mysql2";
// import dotenv from "dotenv";

// dotenv.config();

// const sql_db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// sql_db.connect((err) => {
//   if (err) {
//     console.error("ERROR CONNECTING TO THE DATABASE:", err.stack);
//     return;
//   }

//   console.log(
//     "CONNECTED TO THE MYSQL DATABASE:",
//     process.env.DB_DATABASE,
//     "NETWORK",
//     sql_db.threadId
//   );

//   // Execute your queries here
//   sql_db.query(`CREATE DATABASE IF NOT EXISTS job_db;`, (err, result) => {
//     if (err) {
//       console.error("ERROR CREATING DATABASE:", err);
//       return;
//     }

//     // Switch to the newly created database
//     sql_db.changeUser({ database: "job_db" }, (err) => {
//       if (err) {
//         console.error("ERROR SWITCHING DATABASE:", err);
//         return;
//       }

//       // Create the 'users' table
//       sql_db.query(
//         `CREATE TABLE IF NOT EXISTS users (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           username VARCHAR(255) NOT NULL UNIQUE,
//           email VARCHAR(255) NULL UNIQUE,
//           phone VARCHAR(20) NULL,
//           password VARCHAR(255) NOT NULL,
//           userType ENUM('jobSeeker', 'Employer', 'Admin') NOT NULL,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )`,
//         (err, result) => {
//           if (err) {
//             console.error("ERROR CREATING TABLE 'users':", err);
//             return;
//           }
//         }
//       );

//       // Create the 'job_postings' table
//       sql_db.query(
//         `
//         CREATE TABLE IF NOT EXISTS job_postings (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           title VARCHAR(255) NOT NULL,
//           description TEXT,
//           requirements TEXT,
//           salary DECIMAL(10,2),
//           location VARCHAR(100),
//           employer_id INT,
//           FOREIGN KEY (employer_id) REFERENCES users(id),
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

//         )`,
//         (err, result) => {
//           if (err) {
//             console.error("ERROR CREATING TABLE 'job_postings':", err);
//             return;
//           }
//         }
//       );

//       // update
//       sql_db.query(
//         `CREATE TABLE IF NOT EXISTS posts (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           title VARCHAR(255) NOT NULL,
//           description TEXT NOT NULL,
//           salary VARCHAR(255),
//           location VARCHAR(255),
//           address VARCHAR(255),
//           company VARCHAR(255),
//           category VARCHAR(255),
//           employmentType VARCHAR(255),
//           posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//           )`,
//         (err, result) => {
//           if (err) {
//             console.log("ERROR CREATING TABLE ", err);
//             return;
//           }
//         }
//       );
//       sql_db.query(
//         `
//           CREATE TABLE IF NOT EXISTS responsibilities (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           post_id INT NOT NULL,
//           responsibility TEXT NOT NULL,
//           FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
//           )
//           `,
//         (err, result) => {
//           if (err) {
//             console.log("ERROR CREATING TABLE ", err);
//             return;
//           }
//         }
//       );
//       sql_db.query(
//         `
//             CREATE TABLE IF NOT EXISTS requirements (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             post_id INT NOT NULL,
//             requirement TEXT NOT NULL,
//             FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
//           )
//           `,
//         (err, result) => {
//           if (err) {
//             console.log("ERROR CREATING TABLE ", err);
//             return;
//           }
//         }
//       );
//     });
//   });
// });

// export { sql_db };

// // import mysql from "mysql2";
// // import dotenv from "dotenv";

// // dotenv.config();

// // const sql_db = mysql.createConnection({
// //   host: process.env.DB_HOST,
// //   user: process.env.DB_USER,
// //   password: process.env.DB_PASSWORD,
// //   database: process.env.DB_DATABASE,
// // });

// // sql_db.connect((err) => {
// //   if (err) {
// //     console.error("ERROR CONNECTING TO THE DATABASE:", err.stack);
// //     return;
// //   }

// //   console.log(
// //     "CONNECTED TO THE MYSQL DATABASE:",
// //     process.env.DB_DATABASE,
// //     "NETWORK",
// //     sql_db.threadId
// //   );

// //   // Execute your queries here
// //   sql_db.query(`CREATE DATABASE IF NOT EXISTS job_db;`, (err, result) => {
// //     if (err) {
// //       console.error("ERROR CREATING DATABASE:", err);
// //       return;
// //     }
// //     // console.log("Database 'job_finding_db' created successfully");

// //     // Switch to the newly created database
// //     sql_db.changeUser({ database: "job_db" }, (err) => {
// //       if (err) {
// //         console.error("ERROR SWITCHING DATABASE:", err);
// //         return;
// //       }

// //       // Create the 'users' table
// //       sql_db.query(
// //         `CREATE TABLE IF NOT EXISTS users (
// //           id INT AUTO_INCREMENT PRIMARY KEY,
// //           username VARCHAR(255) NOT NULL,
// //           email VARCHAR(255) NULL,
// //           phone VARCHAR(20) NULL,
// //           password VARCHAR(255) NOT NULL,
// //           userType ENUM('jobSeeker', 'Employer', 'Admin') NOT NULL,
// //           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// //           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// //         )`,
// //         (err, result) => {
// //           if (err) {
// //             console.error("ERROR CREATING TABLE 'users':", err);
// //             return;
// //           }
// //           // console.log("Table 'users' created successfully");
// //         }
// //       );

// //       // Create the 'job_postings' table
// //       sql_db.query(
// //         `CREATE TABLE IF NOT EXISTS job_postings (
// //           id INT AUTO_INCREMENT PRIMARY KEY,
// //           title VARCHAR(255) NOT NULL,
// //           description TEXT,
// //           requirements TEXT,
// //           salary VARCHAR(20),
// //           location VARCHAR(100),
// //           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// //           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// //         )`,
// //         (err, result) => {
// //           if (err) {
// //             console.error("ERROR CREATING TABLE 'job_postings':", err);
// //             return;
// //           }
// //           // console.log("Table 'job_postings' created successfully");
// //         }
// //       );
// //     });
// //   });
// // });

// // export { sql_db };

// // // // // CREATE DATABASE job_landing;

// // // // // USE job_landing;

// // // // // CREATE TABLE users (
// // // // //     id INT AUTO_INCREMENT PRIMARY KEY,
// // // // //     username VARCHAR(50) NOT NULL UNIQUE,
// // // // //     password VARCHAR(255) NOT NULL,
// // // // //     email VARCHAR(100) NOT NULL UNIQUE,
// // // // //     role ENUM('admin', 'user') DEFAULT 'user'
// // // // // );

// // // // // CREATE TABLE jobs (
// // // // //     id INT AUTO_INCREMENT PRIMARY KEY,
// // // // //     title VARCHAR(100) NOT NULL,
// // // // //     description TEXT NOT NULL,
// // // // //     company VARCHAR(100) NOT NULL,
// // // // //     location VARCHAR(100) NOT NULL,
// // // // //     salary DECIMAL(10, 2) NOT NULL,
// // // // //     date_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// // // // // );
