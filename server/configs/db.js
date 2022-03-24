const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(process.env.MONGOOSE_DB_URL);
};
