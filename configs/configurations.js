module.exports = {
  mongodbURL: `mongodb+srv://dakshya:${process.env.MONGO_DB_PASS}@cluster0.bis6o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  PORT: process.env.PORT || 4040,
};
