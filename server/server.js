const express = require('express');
const app = express();
const cors = require('cors'); // Import the cors middleware
require('dotenv').config();
const dbConfig = require('./config/dbConfig');

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

const usersRoute = require('./routes/usersRoute');
const moviesRoute = require("./routes/moviesRoute");
const theatreRoute = require("./routes/TheatresRoute");
const bookingsRoute = require("./routes/bookingsRoute")

app.use('/api/users', usersRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/theatres",theatreRoute)
app.use("/api/bookings",bookingsRoute);

const port = process.env.PORT || 5000;

const path = require("path");
__dirname = path.resolve();


// render deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`NODE JS server running on port ${port}`));
