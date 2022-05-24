import nodemailer, { TransportOptions } from "nodemailer";
import pug from "pug";
import htmlToText from "html-to-text";

class Email {
  to: string;
  firstName: string;
  url: string;
  from: string;
  backendUrl: string;

  constructor(user: any, url: string, backendUrl: string) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url || "";
    this.from = `PizzaPortal <${process.env.EMAIL_FROM}>`;
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
      host: `${process.env.EMAIL_HOST}`,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    } as TransportOptions);
  }

  async send(template: string, subject: string, ...otherProps: any) {
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
      text: htmlToText.fromString(html),
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Witamy w serwisie PizzaPortal!");
  }

  async sendPasswordReset() {
    await this.send("passwordReset", "PizzaPortal - reset hasła");
  }

  async sendBooking(booking: any) {
    await this.send(
      "booking",
      "PizzaPortal - przyjęliśmy twoje zamówienie",
      booking
    );
  }

  async sendBookingPaid(booking: any) {
    await this.send(
      "bookingPaid",
      "PizzaPortal - zamówienie zostało opłacone",
      booking
    );
  }

  async sendMessageReply(reply: any) {
    await this.send(
      "reply",
      "[no-reply] PizzaPortal - odpowiedź na twoje pytanie",
      {
        reply,
      }
    );
  }
}

export default Email;
