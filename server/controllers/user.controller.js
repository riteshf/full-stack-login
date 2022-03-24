const express = require("express");
const User = require("../models/User.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    //select is used to select and de-select/remove fields from find result
    // `-` sign before any field name means this field will not be returned
    const users = await User.find().select("-password");
    return res.status(200).json({ data: users });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});

module.exports = router;
