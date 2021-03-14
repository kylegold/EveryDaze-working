// DEPENDENCIES;
// =============:
const Router = require("express").Router();
const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 1 // limit each IP to 1 requests per windowMs
});

// const jwt = require("jsonwebtoken");
// const passport = require("passport");
const db = require("../models");
var moment = require("moment");
moment().format();
moment().locale();

Router.get("/messages", async (req, res) => {
  try {
    const messages = await db.Message.find().lean();
    res.status(200).send(messages);
  }
  catch(error) {
    console.error(error);
    res.status(500).end();
  }
});

Router.post("/messages", async (req, res) => {
  try {
    const newMessage = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      created_At: moment().format(("M/D/YY, h:mma")),
    };
    const message = (await db.Message.create(newMessage)).toObject();
    res.status(201).send(message);
  }
  catch (error) {
    console.error(error);
    res.status(500).end();
  }
})

Router.put("/messages/upvote/:id", limiter, async (req, res) => {
  try {
    console.log('paramds==>>', req.params)
    const message = await db.Message.findByIdAndUpdate(req.params.id, {$inc: {upvotes: 1}}, {new: true});
    res.status(201).send(message);
  }catch (error) {
    res.status(500).send(error);
  }
})


module.exports = Router;