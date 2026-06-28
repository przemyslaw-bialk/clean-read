const path = require("path");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

// routes
const articleRoutes = require("./routes/articles");
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contactForm");
const aiRoutes = require("./routes/ai");
const rssRoutes = require("./routes/rss");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/ai", aiRoutes);
app.use("/api/user", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/rss", rssRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running " });
});

// connect DB + start server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to DB and listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
