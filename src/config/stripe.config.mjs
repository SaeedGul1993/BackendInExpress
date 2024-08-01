import Stripe from "stripe";
const stripeConfig = () => {
  console.log("process.env.STRIPE_SECRET_KEY", process.env.STRIPE_SECRET_KEY);
  let stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  return stripe;
};

export { stripeConfig };
