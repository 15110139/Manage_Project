import BaseController from "./base";
import ProjectlHandler from "../handlers/project";

let projectHandler = new ProjectlHandler();

//Import validate input scheme
import { PROJECT_SHEME } from "../validationSchemes/auth";
import ValidationError from "../errors/validation";

class ProjectController extends BaseController {
  constructor() {
    super();
    this._passport = require("passport");
  }
  /**
   * Function : Login new user
   * Params: information of user
   * Result: access-token
   */

  async createNewProjectByUser(req, res) {
    let data = req.body;
    console.log("vao nel");
    try {
      let errors = await this.getErrorsParameters(req, PROJECT_SHEME);
      if (errors.length > 0) throw new ValidationError(errors);
      let newProject = await projectHandler.createNewProject(
        req.usesId,
        data.name,
        data.backgroundUrl
      );

      this.response(res).onSuccess(newProject);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }
}

export default ProjectController;
