const Review = require("../models/review_Schema");

const add_review = (req, res) => {
  const user = req.user;

  const { productId, title, description, rating } = req.body;
  const reviewDetails = new Review({
    user: user.uuid,
    product: productId,
    title: title,
    description: description,
    rating: rating,
  });
  reviewDetails
    .save()
    .then((isSaved) => {
      res.status(200).json({
        isSaved,
        message: "Your review has been posted successfully, Thank You!",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const get_review = (req, res) => {
  const { product_id } = req.params;
  Review.find({ product: product_id })
    .populate("user", "name")
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  add_review,
  get_review,
};
