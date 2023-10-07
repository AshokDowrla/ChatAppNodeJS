const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailGun = new Mailgun(formData);
const mg = mailGun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const sendSGMail = async ({
  from,
  to,
  sender,
  subject,
  html,
  attachments,
  text,
}) => {
  msg = mg.messages.create(process.env.MAILGUN_DOMAIN, {
    to: to, // Change to your recipient
    from: from, // Change to your verified sender
    subject: subject,
    html: html,
    // text: text,
    attachments,
  });

  
  return msg
    .then((msg) =>  console.log(msg)) // logs response data
    .catch((err) => res.status(500).send(err)); // logs any error;
};

exports.sendEmail = async (args) => {
  if (!process.env.NODE_ENV === "development") {
    return Promise.resolve();
  } else {
    return sendSGMail(args);
  }
};
