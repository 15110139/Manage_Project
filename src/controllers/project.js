import BaseController from "./base";
import ProjectlHandler from "../handlers/project";

//Import validate input scheme
import {
  PROJECT_SHEME,
  ADD_MEMBERS_TO_PROJECT
} from "../validationSchemes/project";
import ValidationError from "../errors/validation";
import AuthHandler from "../handlers/auth";
import ActivetHandler from "../handlers/active";

const activetHandler = new ActivetHandler();
const authHandler = new AuthHandler();
const projectHandler = new ProjectlHandler();

class ProjectController extends BaseController {
  async createNewProjectByUser(req, res) {
    let data = req.body;
    try {
      let errors = await this.getErrorsParameters(req, PROJECT_SHEME);
      if (errors.length > 0) throw new ValidationError(errors);
      let newProject = await projectHandler.createNewProject(
        req.userId,
        data.name,
        data.backgroundUrl
      );
      this.response(res).onSuccess(newProject);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }
  async addMembersToProject(req, res) {
    const { userId, projectId } = req.body;
    try {
      const errors = await this.getErrorsParameters(
        req,
        ADD_MEMBERS_TO_PROJECT
      );
      if (errors.length > 0) throw new ValidationError(errors);
      const user = await authHandler.getUserById(userId);
      if (!user) throw new ValidationError("USER_NOT_FOUND");
      const project = await projectHandler.getProjectById(projectId);
      if (!project) throw new ValidationError("PROJECT_NOT_FOUND");
      const listMembersInProject = project.members;
      if (project.userId === userId)
        throw new ValidationError("MEMBERS_IS_PEOPLE_CREATE_PROJECT");
      const isExist = listMembersInProject.indexOf(userId);
      if (isExist !== -1) throw new ValidationError("MEMBERS_IS_IN_PORJECT");
      const result = await projectHandler.addMembersToProject(
        projectId,
        userId
      );
      await activetHandler.createNewActive(
        "ASSGIN_MEMBER_TO_PROJECT",
        projectId,
        null,
        req.userId,
        null,
        userId,
        null
      );
      this.response(res).onSuccess(result);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }

  async removeMembersToProject(req, res) {
    const { projectId, userId } = req.body;
    try {
      let errors = await this.getErrorsParameters(req, ADD_MEMBERS_TO_PROJECT);
      if (errors.length > 0) throw new ValidationError(errors);
      const project = await projectHandler.getProjectById(projectId);
      const listMembersInProject = project.members;
      const isExistProject = listMembersInProject.indexOf(userId);
      if (isExistProject == -1)
        throw new ValidationError("MEMBERS_IS_NOT_IN_PROJECT");
      const newProject = await projectHandler.removeMembersToProject(
        projectId,
        userId
      );
      this.response(res).onSuccess(newProject);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }
  async getListProjectByUser(req, res) {
    try {
      const { userId } = req;
      const projectsCreateByUser = await projectHandler.getListProjectCreateByUser(
        userId
      );
      const projectsIsMembers = await projectHandler.getListProjectIsMembers(
        userId
      );
      const projects = projectsCreateByUser.concat(projectsIsMembers);
      this.response(res).onSuccess(projects);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }
}

export default ProjectController;
