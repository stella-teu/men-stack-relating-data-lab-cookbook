import { Router } from "express";
const router = Router();
import User from "./auth.js";

router.get("/", async (req, res) => {
    res.render('foods/index.ejs');
})

router.get("/new", (req, res) => {
    res.render("foods/new.ejs");
})

export default router;