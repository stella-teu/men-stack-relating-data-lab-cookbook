import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import session from "express-session";
import MongoStore from "connect-mongo";
import router from "./controllers/auth.js"


const app = express();
const port = process.env.PORT ? process.env.PORT : "3000";
mongoose.connect(process.env.MONGODB_URI);
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/auth", router);
app.get('/', (req, res) => {
    res.render('index.ejs', {
      user: req.session.user,
    });
  });
app.get('/vip-lounge', (req, res) => {
    if (req.session.user) {
      res.send(`Welcome to the party ${req.session.user.username}.`);
    } else {
      res.send('Sorry, no guests allowed.');
    }
  });

mongoose.connection.on("connected", ()=> {
    console.log("Connected to MongoDB");
    app.listen(port, ()=> {
        console.log("Listening on port " + port);
    });
})