import { matchedData, validationResult } from "express-validator";
import { User } from "../db/userModel.mjs";
import { stripeConfig } from "../config/stripe.config.mjs";

const addPaymentController = async (request, response) => {
  const { user } = request;
  const { email, fullName } = user;
  const result = validationResult(request);
  if (!result.isEmpty())
    return response.status(400).send({ message: result.array() });
  const data = matchedData(request);
  console.log("payment data", data, email);
  try {
    const existingUser = await User.findOne({ email });
    let customerId = null;
    if (!existingUser)
      return response.status(400).send({ message: "User not found!." });
    if (!existingUser?.customer_id) {
      const customer = await stripeConfig().customers.create({
        email,
        name: fullName,
      });
      existingUser.customer_id = customer?.id;
      await User.updateOne({ email }, existingUser);
      customerId = customer?.id;
    } else {
      customerId = existingUser?.customer_id;
    }
    console.log("cardToken", customerId);

    const cardToken = await stripeConfig().tokens.create({
      card: {
        name: data?.name,
        number: data?.number,
        exp_year: data?.exp_year,
        exp_month: data?.exp_month,
        cvc: data?.cvc,
      },
    });
    console.log("cardToken", cardToken);
    const card = await stripeConfig().customers.createSource(customerId, {
      source: cardToken?.id,
    });

    const createCharges = await stripeConfig().charges.create({
      receipt_email: "saeedgulkhan1993@gmail.com",
      amount: 2000 * 100,
      currency: "USDT",
      customer: customerId,
      source: card?.id,
    });
    return response.status(201).send({
      message: "Your Payment Successfully Created",
      data: createCharges,
    });
  } catch (error) {
    console.log(error, "api error");
    return response.sendStatus(500);
  }
};

export { addPaymentController };
