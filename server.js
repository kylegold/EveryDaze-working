require("dotenv").config();
const compression = require('compression')
const express = require('express')
const routes = require("./routes");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4001;
const mongoose = require("mongoose");

app.use(compression())
app.use(express.urlencoded({ extended: true, useNewUrlParser: true }));
app.use(express.json());


const cors = require("cors");
app.use(cors());

// app.all(/.*/, function(req, res, next) {
//   var host = req.header("host");
//   if (host.startsWith('localhost')) return next();

//   if (host.match(/^www\..*/i)) {
//     next();
//   } else {
//     res.redirect(301, "https://www.whatdazeit.com");
//   }
// });

app.use(express.static(path.join(__dirname, "client/build")));

mongoose.connect(process.env.MONGO_URI, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.use("/", routes);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

app.listen(PORT, () => {
	console.log("Your server is listening on: http://localhost:" + PORT);
});

