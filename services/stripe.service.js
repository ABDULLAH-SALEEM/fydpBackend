const Stripe = require('stripe')("sk_test_51N2Y8SBwRKNKiXUsyeDN1LBPmGc7JbXd85R2nf5MRb2Akeuc8KLQTkbuvuJF8l0j13U6ieFavK17QLPoTRRbfAru00TLBATDAU");
const { UserModel } = require("#models/user");
const { PackageModel } = require("#models/package");
const { purchasePackage } = require('./email.service');


async function Paymentsuccess(req, res, buf) {
  console.log("call recieve on webhook")
  let event = req.body;

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const subscription = await Stripe.subscriptions.retrieve(session.subscription, {
      expand: ['items.data.price.product'],
    });
    const email = session.customer_details.email
    const userFind = await UserModel.findOne({ email })
console.log("userFind",userFind)
    if (userFind.subscriptionId!="free" && userFind.subscriptionId) {
    Stripe.subscriptions.del(
      userFind.subscriptionId,
      async function (err, confirmation) {
        if (err) {
          console.log(400, "Error in cancelling sbscription");
        } else {
          console.log(200, "Your request to cancel subscription is recieved");
        }
      }
    );
  }
    const price = subscription.plan.id
    const subscriptionId = subscription.id
    const package = await PackageModel.findOne({ price: { $in: [price] } })
    const index = package.price.indexOf(price)
    const tokens = package.tokens[index]
    const date = new Date()
    let packageExpireOn;
    if (index == "0") {
      packageExpireOn =new Date( date.getFullYear(), date.getMonth() + 1, date.getDate())
    } else {
      packageExpireOn = new Date(date.getFullYear()+1, date.getMonth() , date.getDate())
    }
    console.log(packageExpireOn)

    const body = { ...package.title, type: package.type[index] }
    console.log(body,subscriptionId)
    await purchasePackage(email)
    const user = await UserModel.findOneAndUpdate({ email }, { subscriptionId, tokens, plan: body, packageBoughtOn: date, packageExpireOn:packageExpireOn }, { new: true })
  } else if (event.type === "customer.subscription.deleted") {
    const subscriptionId = event.data.object.id;
    const user = await UserModel.findOneAndUpdate({ subscriptionId }, { subscriptionId: null, plan: null }, { new: true })
  }

  res.sendStatus(200);
}

module.exports = { Paymentsuccess }