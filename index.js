const express = require("express");
require("./dbConnect.js");
const User = require('./model/User.js');
const app = express();

app.use(express.json());


//this is sign up API : data(registration detail of a user)  save  to database which is coming from signUP (react)
app.post("api/register", async (req, res) => {

    const user = new User(req.body); /* In this line, a new user object is created based on the data received in the HTTP request (req.body). 
    The assumption here is that User is a Mongoose model or schema that defines the structure and behavior of user documents in the MongoDB database.
     By passing req.body as an argument to the User constructor, you are initializing a new user object with the data from the request.*/
    let result = await user.save();
    result = result.toObject(); /* The result variable initially contains a Mongoose document. In some situations, you may want to work with the document data as a plain JavaScript object instead of a Mongoose document.
     The .toObject() method is used here to achieve this conversion.
    Converting to a plain JavaScript object can be useful when you need to manipulate or send the data in JSON format or perform operations that are more straightforward with regular objects.*/

    delete result.password; // we cannot use .select("-password") in save() s we delete it like this below line ; 
   
   res.status(200).json({result:"user registered success"});

})

// NOte://way to use JWT authentication in API is hown below in this API
//Note:post() method is always used for login API for security purpose.(but there is nothing to save to dtabsse in this API)
app.post("api/login", async (req, res) => {
    //  now we want that if both req.body.email and req.body.password are given then only this serach opreation and rest will be be done for that we use below condition.
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");  //finds req.body sent by postman or react in database and return record if found by eliminating password , else return error.
        //when user  data got by req.body that means he is  authorized user then we  have generated JWT 
        if (user) {
            res.send(user); //body is not function ,its aproperty so use "body" not "body()"
            
        }
        else {
            res.send({ result: "user not found" });
        }
    }
    else {
        res.send({ result: "enter al field" });
    }


})
app.listen(5000);