const Coupon = require("../models/coupon_schema");
const { Validator } = require("node-input-validator");

const add_coupon = (req, res) => {

  const { name, couponDiscount, is_active } = req.body;

  const v = new Validator(req.body, {
    name: "required",
    couponDiscount: "required",
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
          discount: couponDiscount,
          is_active: is_active,
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
            if(!isFound) throw  "Coupon not found";
            res.status(200).json({
                name:isFound.name,
                isValid:true,
                discount:isFound.discount
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({err});
        });
    }
  });
};

const get_coupons = (req, res) => {
  Coupon.find()
    .then((isFound) => {
      res.status(200).json({ coupons: isFound });
    })
    .catch((err) => {
      console.log(err);
    });
};



module.exports = {
  add_coupon,
  redeem_coupon,
  get_coupons
};
