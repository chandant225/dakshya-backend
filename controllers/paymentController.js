const Payment = require("../models/payment_schema");


const add_payment = (req, res) => {

  const { user_id, order_id, ref_id, payment, cart , payment_method} = req.body;

  const AddPayment = new Payment({
    user_id: user_id,
    order_id: order_id,
    payment_method: payment_method,
    ref_id: ref_id,
    payment: payment,
    cart: cart,
  });
  AddPayment.save()
    .then((issaved) => {
      res.json({ message: "new payment added successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};



module.exports = {
  add_payment,
};
