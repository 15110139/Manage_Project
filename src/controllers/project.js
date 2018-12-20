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
import TaskHandler from "../handlers/task";
import ListHandler from "../handlers/list";

const listHandler = new ListHandler();
const taskHandler = new TaskHandler();
const activetHandler = new ActivetHandler();
const authHandler = new AuthHandler();
const projectHandler = new ProjectlHandler();

class ProjectController extends BaseController {
  async createNewProjectByUser(req, res) {
    let { backgroundUrl, name } = req.body;
    let errors = await this.getErrorsParameters(req, PROJECT_SHEME);
    if (errors.length > 0) this.response(res).onError("INVALID_ARGUMENT");
    try {
      const project = await projectHandler.getProjectByName(name);
      if (project) throw new ValidationError("DUPLICATE_NAME");
      let newProject = await projectHandler.createNewProject(
        req.userId,
        name,
        backgroundUrl
      );
      this.response(res).onSuccess(newProject);
    } catch (errors) {
      this.response(res).onError(null, errors);
    }
  }
  async addMembersToProject(req, res) {
    const { arrUserId, projectId } = req.body;
    const errors = await this.getErrorsParameters(req, ADD_MEMBERS_TO_PROJECT);
    if (errors.length > 0) this.response(res).onError("INVALID_ARGUMENT");
    try {
      // const user = await authHandler.getUserById(userId);
      // if (!user) throw new ValidationError("USER_NOT_FOUND");
      const project = await projectHandler.getProjectById(projectId);
      if (!project) throw new ValidationError("PROJECT_NOT_FOUND");
      // const listMembersInProject = project.members;
      // if (isExist !== -1) throw new ValidationError("MEMBERS_IS_IN_PORJECT");
      await projectHandler.addMembersToProject(
        projectId,
        arrUserId
      );
      // await activetHandler.createNewActive(
      //   "ASSGIN_MEMBER_TO_PROJECT",
      //   projectId,
      //   null,
      //   req.userId,
      //   null,
      //   userId,
      //   null
      // );
      this.response(res).onSuccess();
    } catch (errors) {
      this.response(res).onError(null, errors);
    }
  }

  async removeMembersToProject(req, res) {
    const { projectId, userId } = req.body;
    let errors = await this.getErrorsParameters(req, ADD_MEMBERS_TO_PROJECT);
    if (errors.length > 0) this.response(res).onError("INVALID_ARGUMENT");
    try {
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
      this.response(res).onError(null, errors);
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
      this.response(res).onError(null, errors);
    }
  }

  // async getProjectAndListAndTaskByTaskId(req, res) {
  //   console.log("dsd",req.params);
  //   const { taskId } = req.params;
  //   if (!taskId) his.response(res).onError("INVALID_ARGUMENT");

  //   try {
  //     const task = await taskHandler.getTaskById(taskId);
  //     if (!task) throw new ValidationError("TASK_IS_NOT_EXIST");
  //     let project = await projectHandler.getProjectById(task.projectId);
  //     if (!project) throw new ValidationError("PROJECT_IS_NOT_EXIST");
  //     if (project.userId !== userId) {
  //       const membersInProject = project.members;
  //       if (membersInProject.indexOf(userId) == -1)
  //         throw new ValidationError("USER_IS_NOT_IN_PROJECT");
  //     }
  //     let lists = await listHandlers.getListsByProjectId(projectId);
  //     let newlistAndTask = await lists.map(async function(el) {
  //       const tasks = await taskHandler.getTasksByListId(el._id);
  //       return {
  //         _id: el._id,
  //         createdAt: el.createdAt,
  //         projectId: el.projectId,
  //         name: el.name,
  //         tasks: tasks
  //       };
  //     });

  //     let newlist = await Promise.all(newlistAndTask);
  //     const newProject = Object.assign(project, {
  //       lists: newlist
  //     });
  //     this.response(res).onSuccess(newProject);
  //   } catch (errors) {
  //     this.response(res).onError(null, errors);
  //   }
  // }

  async getListAndTaskByProjectId(req, res) {
    const { projectId } = req.params;
    const { userId } = req;
    if (!projectId) this.response(res).onError("INVALID_ARGUMENT");
    try {
      let project = await projectHandler.getProjectById(projectId);
      if (!project) throw new ValidationError("PROJECT_IS_NOT_EXIST");
      if (project.userId !== userId) {
        const membersInProject = project.members;
        if (membersInProject.indexOf(userId) == -1)
          throw new ValidationError("USER_IS_NOT_IN_PROJECT");
      }
      const tasks = await taskHandler.getTasksByProjectId(projectId);

      const lists = await listHandler.getListsByProjectId(projectId);

      this.response(res).onSuccess({ project, tasks, lists });
    } catch (errors) {
      this.response(res).onError(null, errors);
    }
  }

  async getProjectAndListAndTaskByTaskId(req, res) {
    const { taskId } = req.params;
    const { userId } = req;
    if (!taskId) this.response(res).onError("INVALID_ARGUMENT");
    try {
      let task = await taskHandler.getTaskById(taskId);
      if (!task) throw new ValidationError("TASK_IS_NOT_EXIST");
      let project = await projectHandler.getProjectById(task.projectId);
      if (!project) throw new ValidationError("PROJECT_IS_NOT_EXIST");
      if (project.userId !== userId) {
        const membersInProject = project.members;
        if (membersInProject.indexOf(userId) == -1)
          throw new ValidationError("USER_IS_NOT_IN_PROJECT");
      }
      const data = await projectHandler.getListAndTaskByProjectId(project._id);
      const newProject = Object.assign(project.toObject(), {
        lists: data
      });
      const newData = { project: newProject, task: task };
      this.response(res).onSuccess(newData);
    } catch (errors) {
      this.response(res).onError(null, errors);
    }
  }

  async removeProject(req, res) {
    const { projectId } = req.params
    const userId = req
    try {
      let project = await projectHandler.getProjectById(projectId);
      if (!project) throw new ValidationError("PROJECT_IS_NOT_EXIST");
      await projectHandler.removeProject(projectId)
      await listHandler.removeListByProjectId(projectId)
      await taskHandler.removeTaskByProjectId(projectId)
      this.response(res).onSuccess();
    } catch (errors) {
      this.response(res).onError(null, errors);

    }
  }
}

export default ProjectController;
