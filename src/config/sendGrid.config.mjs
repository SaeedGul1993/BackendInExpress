import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

const createSendGridConnection = () => {
  const sendGridApiKey = process.env.sendGridAPIKey;
  let options = {
    auth: {
      api_key: sendGridApiKey,
    },
  };
  let mailer = nodemailer.createTransport(sgTransport(options));
  return mailer;
};

export { createSendGridConnection };
