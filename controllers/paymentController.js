const Payment = require("../models/payment_schema");
const Order = require("../models/order_Schema");
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
    phone
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
    phone,
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

      const AddOrder = new Order({
        cityShipping: cityShipping,
        cityBilling: cityBilling,
        addressBilling: addressBilling,
        addressShipping: addressShipping,
        stateShipping: stateShipping,
        stateBilling: stateBilling,
        nameBilling: nameBilling,
        nameShipping: nameShipping,
        phone: phone
      })
        AddOrder.save()
        AddPayment.save().then(async() => {
          await EmailUtils.purchaseInvoice({ userEmail: email, data });
          res.json({ message: "new payment added successfully" });
        })
        .catch((err) => {
          console.log(err, "from payment controller");
        });
    }
  });
};

const list_payment = (req, res) => {
  Payment.find()
    .populate("user_id", "_id name")
    .then((paymentData) => res.status(200).json({ paymentData }))
    .catch((err) => console.log(err));
};

module.exports = {
  add_payment,
  list_payment,
};
