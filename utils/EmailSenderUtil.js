const { transporter } = require("./EmailInstanceCreator");
const Email = require("email-templates");
const root = require("rootrequire");
const EmailUtils = {
  purchaseInvoice: async function ({ userEmail, data }) {
    console.log(root, "dirname location ========>");
    const email = new Email({
      transport: transporter,
      send: true,
      preview: false,
      views: {
        options: {
          extension: "ejs",
        },
        root: `${root}/assets`,
      },
    });
    const messageSender = process.env.EMAIL;
    try {
      await email.send({
        template: "PurchaseInvoice",
        message: {
          from: messageSender,
          to: userEmail,
        },
        locals: {
          email: userEmail,
          payment_method: data.payment_method,
          order_id: data.order_id,
          ref_id: data.ref_id,
          total: data.total,
          cart: data.cart,
          cityShipping: data.cityShipping,
          cityBilling: data.cityBilling,
          addressBilling: data.addressBilling,
          addressShipping: data.addressShipping,
          stateShipping: data.stateShipping,
          stateBilling: data.stateBilling,
          nameBilling: data.nameBilling,
          nameShipping: data.nameShipping,
          dateOfPurchase: data.dateOfPurchase,
          deliverCharge: data.deliverCharge,
        },
      });
    } catch (e) {
      console.log("Mail Not Sent", e);
      throw e;
    }
  },
};

module.exports = { EmailUtils };
