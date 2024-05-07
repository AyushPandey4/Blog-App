const express = require("express");
var cors = require('cors')
const app = express();
const mongoConnect = require("./config")
const port = 5000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use("/user", require("./routes/user"));
app.use("/blog", require("./routes/blog"));

app.get("/", (req,res)=>{
    res.send("hello world")
})


app.listen(port, () => {
    console.log("server is running on port:", port);
})