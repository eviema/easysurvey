const passport = require("passport");

module.exports = app => {
  // add a route handler
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // add another route handler
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user); // for test, user should have been killed by passport
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
