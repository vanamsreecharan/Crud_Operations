require("dotenv").config();
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

sequelize
  .sync({ alter: true })  // Use alter: true to keep tables up-to-date
  .then(() => {
    console.log("✅ SQLite database synchronized");
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to sync SQLite database:", error);
  });
