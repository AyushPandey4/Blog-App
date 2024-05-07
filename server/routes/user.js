const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const authUser = require("../middleware/authUser");
const secretKey = "iloveyou";


router.get("/", (req, res) => {
    res.send("user js running");
});

router.post("/signup", async (req, res) => {
    const { name, email, password, username, bio, location, dob } = req.body;
    let success = false;
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        console.log(hashPassword);
        const signupUser = await new userModel({ name, email, password: hashPassword, username, bio, location, dob }).save();
        success = true;
        res.json(success);
    } catch (error) {
        res.status(500).send("Error while signing up user");
    }
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let success = false;
    try {
        const findUser = await userModel.findOne({ email });
        if (findUser) {
            const passwordCompared = await bcrypt.compareSync(password, findUser.password);
            if (passwordCompared) {
                const payload = {
                    id: findUser._id
                };
                // console.log("Token payload:", payload); // Debug: Log the token payload
                var token = jwt.sign(payload, secretKey);
                success = true;
                // console.log("Generated token:", token); // Debug: Log the generated token
                res.json({ success, token });
            } else {
                res.status(401).send("Credentials wrong");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(500).send("Error while logging in");
    }
});

router.get('/getuser/:id', async (req, res) => {
    try {
     const userId = req.params.id;
      const user = await userModel.findById(userId).select("-password")
      res.json(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("failed to fetch the user details");
    }
  })

module.exports = router;
