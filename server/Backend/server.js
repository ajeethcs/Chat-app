const express = require("express");
const { chats } = require("./data/data");
const app = express();
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const chatRoutes = require("./routes/chatRoutes");
dotenv.config();
const mongoDB_uri = process.env.MONGO_URI;
connectDB();
app.use(express.json()); //required if server has to accept data in json format

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// app.use(notFound)
// app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT} \n `);
  // console.log(mongoDB_uri);
});
