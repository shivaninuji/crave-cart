// authController.js
import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-google-oauth2";
import dotenv from "dotenv";
dotenv.config();

import { UsersModel } from "../models/Users.js";
export const initializeGoogleOAuth = () => {
  passport.use(
    new OAuth2Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await UsersModel.findOne({ googleId: profile.id });

          if (!user) {
            user = new UserModel({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value,
              image: profile.photos[0].value,
            });

            await user.save();
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = passport.authenticate("google", {
  successRedirect: `${process.env.CLIENT}/login`,
  failureRedirect: `${process.env.CLIENT}/`,
});
