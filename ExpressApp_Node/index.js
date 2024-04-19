const express = require('express');
const app = express();
const PORT = 5001;

app.get('/', (req, res) =>{
    res.json({
        message : "This is our HOME Page!!1"
    })
});

app.get("/users", (req, res) => {
  res.json({
    message: "Get All Users"
  });
});

app.get("/users/:id", (req, res) => {
  res.json({
    message: `GET User with ID ${req.params.id}`
  });
});

app.post("/users/:id", (req, res) => {
  res.json({
    message: `POST a new User`
  });
});
app.put("/users/:id", (req, res) => {
  res.json({
    message: `UPDATE User with ID ${req.params.id}`
  });
});

app.delete("/users/:id", (req, res) => {
  res.json({
    message: `DELETE User with ID ${req.params.id}`
  });
});

app.listen(PORT , ()=>{
    console.log(`Your App is Running on PORT : ${PORT}`);
})