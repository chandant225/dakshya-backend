const Payment = require("../models/payment_schema");
const { Validator } = require("node-input-validator");


const add_payment = (req, res) => {

  const {
    user_id,
    order_id,
    ref_id,
    payment,
    cart,
    payment_method,
    email,
  } = req.body;

  const v = new Validator(req.body, {
    user_id: "required",
    order_id: "required",
    ref_id: "required",
    payment: "required",
    cart: "required",
    email:"required",
    payment_method: "required",
  });

  v.check().then((matched) => {
    if (!matched) {
      res.status(422).send(v.errors);
    }
    else
    {
        const AddPayment = new Payment({
        user_id: user_id,
        order_id: order_id,
        payment_method: payment_method,
        ref_id: ref_id,
        payment: payment,
        cart: cart,
        email:email
        });
        
        AddPayment.save()
        .then((issaved) => {
            res.json({ message: "new payment added successfully" });
        })
        .catch((err) => {
            console.log(err);
        });
    }
    });
};



module.exports = {
  add_payment,
};
