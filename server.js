/*require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const sequelize = require("./db");
const userRoutes = require("./Routes/routes");
app.use(express.static("public"));
app.use(express.json());
app.use("/", userRoutes);
app.get("/", (req, res) => {
  res.send("your get request is working!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
*/
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const userRoutes = require("./Routes/routes");
const authRoutes = require("./Routes/auth");

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());


app.use("/auth", authRoutes);


app.use("/", userRoutes);

// Basic health check route
app.get("/", (req, res) => {
  res.send("Your GET request is working!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
