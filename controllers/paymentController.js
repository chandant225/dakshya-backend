const Payment = require("../models/payment_schema");
const { Validator } = require("node-input-validator");
const { EmailUtils } = require("../utils/EmailSenderUtil");
const moment = require("moment");

const add_payment = async (req, res) => {
  const {
    user_id,
    order_id,
    ref_id,
    payment,
    cart,
    payment_method,
    email,
    total,
    cityShipping,
    cityBilling,
    addressBilling,
    addressShipping,
    stateShipping,
    stateBilling,
    nameBilling,
    nameShipping,
  } = req.body;
  // data for email
  const data = {
    payment_method,
    order_id,
    ref_id,
    total,
    cart,
    cityShipping,
    cityBilling,
    addressBilling,
    addressShipping,
    stateShipping,
    stateBilling,
    nameBilling,
    nameShipping,
    dateOfPurchase: moment(Date.now()).format("MMM-DD-YYYY"),
  };
  const v = new Validator(req.body, {
    user_id: "required",
    order_id: "required",
    ref_id: "required",
    payment: "required",
    cart: "required",
    email: "required",
    payment_method: "required",
  });

  v.check().then((matched) => {
    if (!matched) {
      res.status(422).send(v.errors);
    } else {
      const AddPayment = new Payment({
        user_id: user_id,
        order_id: order_id,
        payment_method: payment_method,
        ref_id: ref_id,
        payment: payment,
        cart: cart,
        email: email,
      });

      AddPayment.save()
        .then(async (issaved) => {
          res.json({ message: "new payment added successfully" });
          await EmailUtils.purchaseInvoice({ userEmail: email, data });
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
