import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { foodRouter } from "./routes/foodRoutes.js";
import { orderRouter } from "./routes/orderRoutes.js";
import session from "express-session";
import passport from "passport";

import {
  initializeGoogleOAuth,
  googleAuth,
  googleAuthCallback,
} from "./controllers/authController.js";

dotenv.config();
const app = express();

const client = process.env.CLIENT;

app.use(express.json());

app.use(
  cors({
    origin: client,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/food", foodRouter);
app.use("/order", orderRouter);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB database!");
});

const port = process.env.PORT || 3000;

// Initialize Google OAuth
initializeGoogleOAuth();

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/google", googleAuth);
app.get("/auth/google/callback", googleAuthCallback);

app.get("/login/success", async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "user Login", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(client);
  });
});

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
