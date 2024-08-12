import express from "express";
import cors from "cors";
import http from "http";
import { Server as SocketIoServer } from "socket.io"; // Corrected import

import authRoute from "./routes/auth.js";
import jobRoute from "./routes/jobs.js";
import userRoute from "./routes/user.js";
import messageRoute from "./routes/messages.js";

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new SocketIoServer(server, {
  cors: {
    origin: "*",
  },
});
// const io = new SocketIoServer(server, {
//   cors: {
//     origin: "http://localhost:3000", // Adjust the origin if needed
//     // methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Nyi is online");
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });

//   socket.on("disconnect", () => {
//     console.log("Nyi is disconnected");
//   });
// });

// const server = http.createServer();
// const io = new SocketIoServer(server, {
//   cors: {
//     origin: "http://localhost:8080", // Adjust the origin if needed
//     methods: ["GET", "POST"],
//   },
// });

// Middleware
app.use(cors());
app.use(express.json());

app.use("/", authRoute);
app.use("/", jobRoute);
app.use("/", userRoute);

app.use("/", messageRoute(io));

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

// Start server
server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});

export default app;

// // BEFORE UPDADE CODE FOR SOCKET_IO
// // import express from "express";
// // import cors from "cors";

// // import authRoute from "./routes/auth.js";
// // import jobRoute from "./routes/jobs.js";
// // import userRoute from "./routes/user.js";
// // import messageRoute from "./routes/messages.js";
// // // import useerRoute from "./routes/useer.js";

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Example route
// // // app.get("/", (req, res) => {
// // //   res.send("Hello World!");
// // // });

// // app.use("/", authRoute);
// // app.use("/", jobRoute);
// // app.use("/", userRoute);
// // app.use("/", messageRoute);
// // // app.use("/", useerRoute);

// // app.use((error, req, res, next) => {
// //   res.status(500).json({ message: error.message });
// // });

// // // Start server
// // app.listen(PORT, () => {
// //   console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
// // });

// // export default app;
