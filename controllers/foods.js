import { Router } from "express";
const router = Router();
import User from "../models/user.js";

router.get("/", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', { foods: currentUser.pantry,});
    } catch (error){
        console.log(error);
        res.redirect("/");
    }
})

router.get("/new", (req, res) => {
    res.render("foods/new.ejs");
})

router.post("/", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect("/users/"+req.session.user._id+"/foods");
    } catch (error){
        console.log(error);
        res.redirect("/");
    }
})

router.delete("/:foodId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.id(req.params.foodId).deleteOne();
        await currentUser.save();
        res.redirect("/users/"+req.session.user._id +"/foods");
    } catch (error){
        console.log(error);
        res.redirect("/");
    }
})

export default router;