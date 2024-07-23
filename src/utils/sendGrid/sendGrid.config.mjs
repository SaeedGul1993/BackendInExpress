import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

const sendGridApiKey = process.env.sendGridAPIKey;

const createSendGridConnection = () => {
  let options = {
    auth: {
      api_key: sendGridApiKey,
    },
  };
  let mailer = nodemailer.createTransport(sgTransport(options));
  return mailer;
};

export { createSendGridConnection };
