const express = require("express");
require("./dbConnect.js");
const User = require('./model/User.js');
const app = express();

app.use(express.json());

//api for listing product : find  all doc from collection: Products and send it  as response.
app.get("/", async (req, resp) => {
    console.log("hello world");
    resp.send("hello world");
});

app.listen(5002, () => {
    console.log(`app is listening on 5002`);
});
