// src/routes/auth.route.js
var {
  login,
  register,
  createUserByAdmin,
  getUserDetails,
  getAllUsers,
  updateUser,
  deleteUser,
  sendOTP,
  verifyOtp,
  resetPassword,
  getCurrentUser,
  getUserPermissions,
} = require("../controllers/UserController");
const auth = require("../middlewares/auth.middleware");
const user = (app) => {
  app.post("/login", login);
  app.post("/api/register", register);

  app.post("/api/user/send-otp", sendOTP);
  app.post("/api/user/verify-otp", verifyOtp);
  app.post("/api/user/reset-password", resetPassword);

  app.get("/api/user/me", auth.validate_token(), getCurrentUser);
  app.get("/api/user/permissions", auth.validate_token(), getUserPermissions);

  app.get("/api/user", auth.validate_token(), getAllUsers);
  app.post("/api/user", auth.validate_token(), createUserByAdmin);
  app.get("/api/user/:id", auth.validate_token(), getUserDetails);
  app.put("/api/user/:id", auth.validate_token(), updateUser);
  app.delete("/api/user/:id", auth.validate_token(), deleteUser);
};
module.exports = user;
