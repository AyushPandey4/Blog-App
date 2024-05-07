const express = require("express");
const router = express.Router()
const blogModel = require("../model/blogModel");
const authUser = require("../middleware/authUser");
const userModel = require("../model/userModel"); 

router.get("/", (req,res) => {
    res.send("blog js running")
})

router.get("/allblogs", async (req,res)=>{
    try {
        const allBlogs = await blogModel.find({}).populate('users', 'username');

        res.json(allBlogs);
    } catch (error) {
        res.status(500).send("Error while getting all blogs");
    }
})

router.get("/myblogs", authUser, async (req,res)=>{
    try {
        const userBlogs = await blogModel.find({users: req.id}).populate('users', 'username');;
        res.json(userBlogs);

       
    } catch (error) {
        res.status(500).send("Error while getting your blogs");
    }
})

router.get("/blog/:id", async (req,res)=>{
    try {
        const Blog = await blogModel.findById(req.params.id).populate('users', 'username');;
        res.json(Blog);

       
    } catch (error) {
        res.status(500).send("Error while getting your blogs");
    }
})


router.post("/createblog", authUser, async (req,res)=>{
    let success = false;
    try {
        const {title, description, tag} = req.body;
        // Find the user by email to get their ID
        const user = await userModel.findById(req.id);
        // console.log("Found user:", req.id);
        // console.log("Found user:", user);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const createBlog = await new blogModel({title, description, tag, users: user._id}).save();
        success = true;
        res.json({createBlog, success}); 

       
    } catch (error) {
        res.status(500).send("Error while creating your blogs");
    }
})

router.post("/update/:id", authUser, async (req,res)=>{
    let success = false;
    try {
        const {title, description, tag} = req.body;
        const newBlog = {};
        if (title) { newBlog.title = title };
        if (description) { newBlog.description = description };
        if (tag) { newBlog.tag = tag };

        let blog = await blogModel.findById(req.params.id);
        if (!blog) { return res.status(404).send("Not Found") }

        const updateBlog = await blogModel.findByIdAndUpdate(req.params.id, { $set: newBlog}, { new: true })
        success = true;
        res.json({updateBlog, success});

       
    } catch (error) {
        res.status(500).send("Error while updating the blog");
    }
})


router.post("/delete/:id", authUser, async (req,res)=>{
    let success = false;
    try {

        let blog = await blogModel.findById(req.params.id);
        if (!blog) { return res.status(404).send("Not Found") }

        const deleteBlog = await blogModel.findByIdAndDelete(req.params.id)
        success = true;
        res.json({ success, deleteBlog: deleteBlog });

       
    } catch (error) {
        res.status(500).send("Error while updating the blog");
    }
})


module.exports = router

