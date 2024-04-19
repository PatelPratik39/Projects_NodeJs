const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()); //built in middleware
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler); //middleware

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
