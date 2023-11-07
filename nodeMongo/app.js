const express = require("express");
const app = express();
const connectDB = require("./connect");
require("dotenv").config();
const taskRoutes = require("./Routes/task");
const notFound = require("./Middleware/404");
const errorHandlerMiddleware = require("./Middleware/errorHandler");
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    orgin: "http://localhost:5173/",
  })
);
app.use("/api/task", taskRoutes);

const port = process.env.PORT || 5000;

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`the port is running at ${port}`);
    });
  } catch (error) {
    console.log("something is wrong look deep", error);
  }
};
start();
