import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

const sendGridApiKey =
  "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";

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
