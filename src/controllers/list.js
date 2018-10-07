import BaseController from "./base";
import { LIST_SHEME, UPDATE_LIST_SHEME } from "../validationSchemes/list";

import ValidationError from "../errors/validation";

import ListHandlers from "../handlers/list";
import ProjectHandler from "../handlers/project";
import ActivetHandler from "../handlers/active";
import TaskHandler from "../handlers/task";

const activetHandler = new ActivetHandler();
const projectHandler = new ProjectHandler();
const listHandlers = new ListHandlers();
const taskHandler = new TaskHandler();

class ListController extends BaseController {
  async createNewList(req, res) {
    const { projectId, name } = req.body;
    const { userId } = req;
    try {
      let errors = await this.getErrorsParameters(req, LIST_SHEME);
      if (errors.length > 0) throw new ValidationError(errors);
      const project = await projectHandler.getProjectById(projectId);
      if (!project) throw new ValidationError("PROJECT_IS_NOT_EXIST");
      if (project.userId !== userId) {
        const membersInProject = project.members;
        if (membersInProject.indexOf(userId) == -1)
          throw new ValidationError("USER_IS_NOT_IN_PROJECT");
      }
      const newList = await listHandlers.createNewList(projectId, name);
      await activetHandler.createNewActive(
        "CREATE_NEW_LIST",
        projectId,
        null,
        userId,
        newList._id,
        null,
        null
      );
      this.response(res).onSuccess(newList);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }

  async removeList(req, res) {
    const { listId } = req.body;
    try {
      let errors = await this.getErrorsParameters(req, LIST_SHEME);
      if (errors.length > 0) throw new ValidationError(errors);
      if (!listId) throw new ValidationError("LIST_ID_IS_NOT_EMPTY");
      const list = await listHandler.getListById(listId);
      if (!list) throw new ValidationError("LIST_IS_NOT_EXIST");
      const project = await projectHandler.getProjectById(list.projectId);
      if (!project) throw new ValidationError("PROJECT_IS_NOT_EXIST");
      if (project.userId !== userId) {
        const membersInProject = project.members;
        if (membersInProject.indexOf(userId) == -1)
          throw new ValidationError("USER_IS_NOT_IN_PROJECT");
      }
      await listHandlers.removeList(listId);
      this.response(res).onSuccess();
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }

  async updateList(req, res) {
    const { listId, name } = req.body;
    const { userId } = req;
    try {
      let errors = await this.getErrorsParameters(req, UPDATE_LIST_SHEME);
      if (errors.length > 0) throw new ValidationError(errors);
      const list = await listHandlers.getListById(listId);
      if (!list) throw new ValidationError("LIST_IS_NOT_EXIST");
      const project = await projectHandler.getProjectById(projectId);
      if (!project) throw new ValidationError("PROJECT_IS_NOT_EXIST");
      if (project.userId !== userId) {
        const membersInProject = project.members;
        if (membersInProject.indexOf(userId) == -1)
          throw new ValidationError("USER_IS_NOT_IN_PROJECT");
      }
      const newList = await listHandlers.updateList(listId, name);
      this.response(res).onSuccess(newList);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }

  async getListsByProjectId(req, res) {
    const { projectId } = req.body;
    const { userId } = req;
    try {
      if (!projectId) throw new ValidationError("PROJECT_ID_IS_NOT_EMPTY");
      const project = await projectHandler.getProjectById(projectId);
      if (!project) throw new ValidationError("PROJECT_IS_NOT_EXIST");
      if (project.userId !== userId) {
        const membersInProject = project.members;
        if (membersInProject.indexOf(userId) == -1)
          throw new ValidationError("USER_IS_NOT_IN_PROJECT");
      }
      const lists = await listHandlers.getListsByProjectId(projectId);
      this.response(res).onSuccess(lists);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }
  async getListAndTaskByProjectId(req, res) {
    const { projectId } = req.body;
    const { userId } = req;
    if (!projectId) this.response(res).onError(null, "INVALID_ARGUMENT");
    try {
      const project = await projectHandler.getProjectById(projectId);
      if (!project) throw new ValidationError("PROJECT_IS_NOT_EXIST");
      if (project.userId !== userId) {
        const membersInProject = project.members;
        if (membersInProject.indexOf(userId) == -1)
          throw new ValidationError("USER_IS_NOT_IN_PROJECT");
      }
      let lists = await listHandlers.getListsByProjectId(projectId);
      let newlistAndTask = await lists.map(async function(el) {
        const tasks = await taskHandler.getTasksByListId(el._id);
        return {
          _id: el._id,
          createdAt: el.createdAt,
          projectId: el.projectId,
          name: el.name,
          tasks: tasks
        };
      });
      let newlist = await Promise.all(newlistAndTask);
      this.response(res).onSuccess(newlist);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }
}

export default ListController;
