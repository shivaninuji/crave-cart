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

// passport.use(
//   new OAuth2Strategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//       scope: ["profile", "email"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await UserModel.findOne({ googleId: profile.id });

//         if (!user) {
//           user = new UserModel({
//             googleId: profile.id,
//             displayName: profile.displayName,
//             email: profile.emails[0].value,
//             image: profile.photos[0].value,
//           });

//           await user.save();
//         }

//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: `${client}/dashboard`,
//     failureRedirect: `${client}/login`,
//   })
// );

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

// Start the server and listen on the specified port
app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
