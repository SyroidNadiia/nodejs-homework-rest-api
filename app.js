const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const winston = require("winston");
require('dotenv').config();

const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const winstonLogger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
  ],
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

app.use((req, res, next) => {
  winstonLogger.info("Отримано запит", { url: req.url, method: req.method });
  if (req.body.htmlData) {
    req.body.htmlData = DOMPurify.sanitize(req.body.htmlData);
  }
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
