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
    const message = await db.Message.findByIdAndUpdate(req.params.id, {$inc: {upvotes: 1}}, {new: true, upsert: true});
    res.status(201).send(message);
  }catch (error) {
    res.status(500).send(error);
  }
})




// const courseWithID = await Course.findById(req.params.id);
// const course = {
//   "course_code": courseWithID.course_code, 
//   "course_title": courseWithID.course_title
// };
// const userID = req.user.id;

// await User.findByIdAndUpdate(userID, 
//   {
//     "$push": { "courses": course }
//   }, 
//   {new: true, runValidators: true, useFindAndModify: false}
// )

// Router.put('/workouts/:_id', function(req, res){

//   db.Workout.findByIdAndUpdate(req.params._id, {$push: {"exercises": req.body}}, {"new": true, "upsert": true, "safe": true}, (err, data) => {
//     if(data){
//     console.log(data)
//     console.log(req.params._id)
//     console.log(req.body)
//     res.status(200).json(data)
  
// }else {res.json(err)}


Router.put("/messages/comment/:_id", ({ body, params }, res) => {
  console.log(body, params);
  
    console.log('params==>>', params)
    db.Message.findByIdAndUpdate(params._id, {$push: {"comments": body}}, {"new": true, "upsert": true, "safe": true}, (err, message)=>{
   if(message){
    res.status(200).json(message);
   }else{res.json(err)} 
    });
    
  
  })


// Router.put("/messages/comment/:_id", async ({ body, params }, res) => {
//   console.log(body, params);
//   try {
//     console.log('params==>>', req.params)
//     const message = await db.Message.findByIdAndUpdate(req.params._id, {$push: {"comments": body}}, {"new": true, "upsert": true, "safe": true});
//     res.status(200).json(message);
//   }catch (error) {
//     res.status(400).send(error);
//   }
// })


module.exports = Router;