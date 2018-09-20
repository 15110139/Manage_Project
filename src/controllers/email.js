import Base from "./base";
import ValidationError from "../errors/validation";
import asycnForEarch from "../helpers/asycnForEarch";
import { VALIDATE_CREATE_TEMPLATE_SCHEMA, VALIDATE_TEMPLATE_NAME_SCHEMA } from "../validationSchemes/email";

// Handlers
import EmailHandler from "../handlers/email";
import UserInfoHandler from "../handlers/userInfo";
//New class

//Mail template
import { NoticeSellTokenTemplate, NoticeSellTokenTemplate2 } from "../templates/email";

const emailHandler = new EmailHandler();
const userInfoHandler = new UserInfoHandler();
//Validate scheme
class EmailController extends Base {
  constructor() {
    super();
    this.response = this._responseHelper.getDefaultResponseHandler;
  }
  BACK_LIST = [
    "xtekasia@gmail.com",
    "cse123@gmail.com",
    "cseglobal@gmail.com",
    "csevnn007@gmail.com",
    "csevnn008@gmail.com",
    "csevnn@gmail.com",
    "cseglobal01@gmail.com",
    "cseglobal02@gmail.com",
    "cseglobal03@gmail.com",
    "cseglobal04@gmail.com",
    "cseglobal05@gmail.com",
    "cseglobal06@gmail.com",
    "cseglobal07@gmail.com",
    "cseglobal08@gmail.com",
    "cseglobal09@gmail.com",
    "cseglobal10@gmail.com",
    "cseglobal11@gmail.com",
    "cseglobal12@gmail.com",
    "cseglobal13@gmail.com",
    "cseglobal14@gmail.com",
    "cseglobal15@gmail.com",
    "cseglobal16@gmail.com",
    "cseglobal17@gmail.com",
    "cseglobal18@gmail.com",
    "admin@csetoken.io",
    "xtekasia2@gmaiil.com",
    "csevnn004@gmail.com",
    "cseglobal888@gmail.com",
    "cseglobal777@gmail.com"
  ];

  /**
   * @function {} Create a template
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async createTemplate(req, res, next) {
    let { content, subject, from, templateName } = req.body;
    try {
      //Validate input
      let errors = await this.getErrorsParameters(
        req,
        VALIDATE_CREATE_TEMPLATE_SCHEMA
      );

      if (errors.length > 0) throw new ValidationError(errors);
      let created = await emailHandler.createTemplate({ content, subject, from, templateName });
      return this.response(res).onSuccess(created);
    } catch (error) {
      return this.response(res).onError(error);
    }
  }

  /**
   * @function {} Get all templates
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getTemplates(req, res, next) {
    try {

      return this.response(res).onSuccess("SUCCESS");
    } catch (error) {
      return this.response(res).onError(error);
    } s
  }

  /**
   * @function {} Send email to address specified
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async sendTo(req, res, next) {
    try {

      return this.response(res).onSuccess("SUCCESS");
    } catch (error) {
      return this.response(res).onError(error);
    }
  }

  /**
   * @function {} Send mail to all user is active
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async sendToAllUsers(req, res, next) {
    let { templateName } = req.body;
    try {
      //Validate input
      let errors = await this.getErrorsParameters(
        req,
        VALIDATE_TEMPLATE_NAME_SCHEMA
      );
      if (errors.length > 0) throw new ValidationError(errors);

      let page = 0;
      let limit = 10;
      let temp = await emailHandler.getTemplateByName(templateName);
      if (!temp) throw new ValidationError("TEMPLATE_NOT_FOUND");
      
      let timer = setInterval(async () => {
        let users = await userInfoHandler.getListUserByPageAndBackList(
          this.BACK_LIST,
          limit,
          page
        );
        if (users.length === 0) {
          console.log("DONE");
          clearInterval(timer);
        } else {
          await asycnForEarch(users, async user => {
            try {
              let payload = await emailHandler.getPayload(user.email, temp);
              await emailHandler.sendEmail(payload, async (error, info) => {
                if (error) {
                  await emailHandler.saveEmailError(payload, error.message);
                }
                console.log("Sent mail to ", user.email);
                console.log("Message sent: %s", info.messageId);
              });
            } catch (error) {
              await emailHandler.saveEmailError({ email: user.email }, error.message);
            }

          });
          page += 1;
        }
      }, 2000);
      return this.response(res).onSuccess("SUCCESS");
    } catch (error) {
      return this.response(res).onError(error);
    }
  }
}
export default EmailController;
