const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url, backendUrl) {
    this.to = user.email;
    this.firstName = user.name ? user.name.split(" ")[0] : "";
    this.url = url || "";
    this.from = `Hat-Clths <${process.env.EMAIL_FROM}>`;
    this.backendUrl = backendUrl || "";
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject, ...otherProps) {
    const html = pug.renderFile(`${__dirname}/../emails/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
      backendUrl: this.backendUrl,
      otherProps: {
        ...otherProps,
      },
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.compile(html),
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Witamy w serwisie Hat-Clths!");
  }

  async sendPasswordReset() {
    await this.send("passwordReset", "Hat-Clths - reset hasła");
  }

  async sendBooking(booking) {
    await this.send(
      "booking",
      "Hat-Clths - przyjęliśmy twoje zamówienie",
      booking
    );
  }

  async sendBookingPaid(booking) {
    await this.send(
      "bookingPaid",
      "Hat-Clths - zamówienie zostało opłacone",
      booking
    );
  }

  async sendNewsletter(productsList, newsletterId) {
    await this.send(
      "newsletter",
      "Newsletter Hat-Clths",
      productsList,
      newsletterId
    );
  }

  async sendNewsletterWelcome(newsletterData) {
    await this.send("newsletterWelcome", "Newsletter Hat-Clts", newsletterData);
  }
};
