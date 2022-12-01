const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const connectDb = require("./db/connectDb");
const userRouter = require("./routers/userRouter");
const mailRouter = require("./routers/mailRouter");
const app = express();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "mongodb://root:example@mongo:27017/events?retryWrites=true&w=majority&authSource=admin";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
connectDb(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/user", userRouter);
app.use("/mail", mailRouter);

const port = 8000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
