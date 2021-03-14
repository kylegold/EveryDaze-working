const Router = require("express").Router();
const messageRouter = require("./messageRouter.js");

Router.use("/message", messageRouter);


module.exports = Router;