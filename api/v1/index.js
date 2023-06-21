const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const models = {};

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    const fullName = path.join(__dirname, file);

    if (file.toLowerCase().endsWith(".js")) {
      // Removes '.js' from the property name in 'models' object
      const [filename] = file.split(".");
      router.use(`/${[filename]}`, require(`./${file}`));
    }
  });

module.exports = router;
