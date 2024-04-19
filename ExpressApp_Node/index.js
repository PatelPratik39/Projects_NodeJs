const express = require("express");
const path = require("path");
const logger = require("morgan");
const multer = require("multer");
const upload = multer({ dest: "./public/upload" });
const app = express();
const router = express.Router();
const PORT = 5001;

// inbuild middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express.static()
app.use("/static", express.static(path.join(__dirname, "public")));

// middleware
const loggerMiddleWare = (req, res, next) => {
  console.log(`${new Date()} --- REAUEST [ ${req.method}] [${req.url}]`);
  next();
};

app.use(logger("combined"));

app.use(loggerMiddleWare);
app.use("/api/users", router);

// fake auth Middleware Function
const fakeAuth = (req, res, next) => {
  const authStatus = true;
  if (authStatus) {
    console.log("Use Auth Status : ", authStatus);
    next();
  } else {
    res.status(401);
    throw new Error("User is not Authorized");
  }
};
const getUsers = (req, res) => {
  console.log("This is request Body from Client : ", req.body);
  res.json({ message: "Gell All Users" });
};
const createUser = (req, res) => {
  res.json({ message: "Create New Users" });
};

router.use(fakeAuth);
router.route("/").get(getUsers).post(createUser);

// ErrorHandlerMiddleware
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  switch (statusCode) {
    case 401:
      res.json({
        title: "Unathorized",
        message: error.message
      });
      break;
    case 404:
      res.json({
        title: "Not Found",
        message: error.message
      });
      break;
    case 500:
      res.json({
        title: "Server Error",
        message: error.message
      });

    default:
      break;
  }
};
// upload image through middleware and postman
app.post(
  "/upload",
  upload.single("image"),
  (req, res, next) => {
    console.log(req.file, req.body);
    res.send(req.file);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.all("*", (req, res) => {
  res.status(404);
  throw new Error("Route Not FOund!!");
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is Running on PORT : ${PORT}`);
});
