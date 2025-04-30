const userService = require("../services/userService");
const sessionService = require("../services/sessionService");

exports.register = async (req, res) => {
  const result = await userService.registerUser(req.body);
  res.status(201).json("User registered successfully");
};

exports.login = async (req, res) => {
  const result = await userService.loginUser(req.body);
  req.session.token = result.token;
  req.session.refreshToken = result.refreshToken;
  res.json("User logged in successfully");
};

exports.getProfile = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "User ID is required" });
  }
  validReq = await sessionService.validateRequest(req);
  if (validReq.status === 401) {
    return res.status(401).json({ error: validReq.res });
  }
  const result = await userService.getUserProfile(req.params.id);
  res.json(result);
  return;
};
