const Coupon = require("../models/coupon_schema");
const { Validator } = require("node-input-validator");


const add_coupon = (req, res) => {

  const {
    name,
    discount,
    is_active,
  } = req.body;

  const v = new Validator(req.body, {
    name: "required",
    discount: "required",
    is_active: "required",
  });

  v.check().then((matched) => {
    if (!matched) {
      res.status(422).send(v.errors);
    }
    else
    {
        const AddCoupon = new Coupon({
        name: name,
        discount: discount,
        is_active: is_active
        });
        
        AddCoupon.save()
          .then((issaved) => {
            res.json({ message: "new coupon added successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
    }
    });
};

const redeem_coupon = (req, res) => {
  const { name } = req.body;

  const v = new Validator(req.body, {
    name: "required",
  });

  v.check().then((matched) => {
    if (!matched) {
      res.status(422).send(v.errors);
    } else {
      Coupon.findOne({ name: name, is_active:true })
        .then((isFound) => {
          res.status(200).json({ coupon: isFound });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};



module.exports = {
  add_coupon,
  redeem_coupon
};
