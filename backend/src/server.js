import express from "express"
require('dotenv').config();


const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
