const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");

const { userRouter } = require("./src/routes/userRoutes");
const { foodRouter } = require("./src/routes/foodRoutes");
const { orderRouter } = require("./src/routes/orderRoutes");

require("dotenv").config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

// Check MongoDB connection
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Passport.js for Google authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if necessary profile information is present
        if (!profile || !profile.emails || !profile.emails[0]) {
          return done(null, false, {
            message: "Incomplete profile information",
          });
        }

        // Check if user already exists in the database
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        } else {
          // If the user doesn't exist, create a new user
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName || "Default Name",
            email: profile.emails[0].value || "Default Email",
            // Add other properties as needed
          });

          await user.save();
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialization and Deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Express session middleware
app.use(
  session({
    secret: "ddndnsjdnjd",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

// Routes
app.use("/auth", userRouter);
app.use("/food", foodRouter);
app.use("/order", orderRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
