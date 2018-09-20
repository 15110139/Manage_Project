import Base from "./base";
import emailConfig from "../../config/email";
import ValidationError from "../errors/validation";

import TemplateEmailModel from "../models/TemplateEmail";
import MailErrorModel from "../models/MailError";
// import mandrillTransport from "nodemailer-mandrill-transport";
// var mailgun = require("mailgun-js")({ apiKey, domain });

const { apiKey, domain, host, user, pass, port } = emailConfig;
const nodemailer = require("nodemailer");
import HTMLing from "htmling";

class EmailHandler extends Base {
  // async sendEmail(data) {
  //   let body = await mailgun.messages().send(data);
  //   console.log(body);
  // }

  /**
   *
   * @param {*} data
   */
  async createTemplate(data) {
    let created = await TemplateEmailModel.create(data);
    return created;
  }

  async getTemplateByName(templateName) {
    let temp = await TemplateEmailModel.findOne({ templateName });
    return temp;
  }

  async getPayload(email, template) {
    return {
      to: email,
      from: template.from ? template.from : "CSE Token <support@csetoken.io>",
      subject: template.subject,
      html: template.content
    };
  }
  async sendEmail(data, cb = null) {
    // create reusable transporter object using the default SMTP transport
    let transporter = await nodemailer.createTransport({
      domain,
      host: host,
      port: port,
      // secure: false, // true for 465, false for other ports
      auth: {
        user: user, // generated ethereal user
        pass: pass // generated ethereal password
      }
    });
    return await transporter.sendMail(data, (error, info) => {
      console.log("ddddddddddddddddddddddddddddddddd", error, info);
    });
  }

  async sendEmail2(data, email = "") {
    // create reusable transporter object using the default SMTP transport
    let transporter = await nodemailer.createTransport({
      domain,
      host: host,
      port: port,
      // secure: false, // true for 465, false for other ports
      auth: {
        user: user, // generated ethereal user
        pass: pass // generated ethereal password
      }
    });
    return await transporter.sendMail(data, async (error, info) => {
      if (error) {
        console.log(error);
        this.saveEmailError(email);
        throw new ValidationError("SYSTEM_MAIL_ERROR");
      }
      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  }

  async saveEmailError(payload, errorMessage) {
    const mailError = await MailErrorModel.findOne({ payload, errorMessage });
    if (mailError) return;
    return MailErrorModel.create({ payload, errorMessage });
  }
}
export default EmailHandler;
