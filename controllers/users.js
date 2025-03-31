import { Router } from "express";
const router = Router();
import User from "../models/user.js";

router.get("/", async (req, res)=> {
    try {
        const users = await User.find({});
        res.render("users/index.ejs", { users });
    } catch (error){
        console.log(error);
        res.redirect("/");
    }
})

export default router;