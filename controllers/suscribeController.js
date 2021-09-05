const Suscriber = require("../models/suscribe_Schema");

const add_suscriber = (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(201).json({ message: "Please enter the empty field" });
  }
  Suscriber.findOne({ email: email }).then((isFound) => {
    if (isFound) {
      res.status(201).json({ message: "You have already subscribed us" });
    } else {
      const newSuscriber = new Suscriber({
        email: email,
      });
      newSuscriber
        .save()
        .then((isSaved) => {
          res
            .status(200)
            .json({ message: "You have subscribed us successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

const getSubscriber = (req, res) => {
  Suscriber.find()
    .then((suscriberdata) => {
      res.status(200).json({ suscriberdata });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteSubscriber = (req, res) => {
  const { Sub_id } = req.params;
  Suscriber.findByIdAndDelete({ _id: Sub_id })
    .then(() => {
      res
        .status(200)
        .json({ message: "Subscriber has been deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  add_suscriber,
  getSubscriber,
  deleteSubscriber,
};
