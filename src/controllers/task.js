import BaseController from "./base";
import {
  TASK_SHEME,
  ADD_MEMBERS_TO_TASK_SHEME,
  SWITCH_TASK_BETWEEN_TWO_LIST
} from "../validationSchemes/task";

import ValidationError from "../errors/validation";

import TaskHandlers from "../handlers/task";
import ProjectHandler from "../handlers/project";
import ListHandler from "../handlers/list";

const taskHandlers = new TaskHandlers();
const projectHandler = new ProjectHandler();
const listHandler = new ListHandler();

class TaskController extends BaseController {
  async createNewTask(req, res) {
    const { listId, title, projectId } = req.body;
    try {
      let errors = await this.getErrorsParameters(req, TASK_SHEME);
      if (errors.length > 0) throw new ValidationError(errors);
      const newTask = await taskHandlers.createNewTask(
        listId,
        projectId,
        title
      );
      this.response(res).onSuccess(newTask);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }

  async addMemberToTask(req, res) {
    const { taskId, userId } = req.body;
    try {
      let errors = await this.getErrorsParameters(
        req,
        ADD_MEMBERS_TO_TASK_SHEME
      );
      if (errors.length > 0) throw new ValidationError(errors);
      const task = await taskHandlers.getTaskById(taskId);
      const project = await projectHandler.getProjectById(task.projectId);
      const listMembersInProject = project.members;
      const isExist = listMembersInProject.indexOf(userId);
      if (isExist == -1) throw new ValidationError("MEMBERS_IS_NOT_IN_PORJECT");
      const listMembersInTask = task.members;
      const isExistTask = listMembersInTask.indexOf(userId);
      if (isExistTask !== -1)
        throw new ValidationError("MEMBERS_IS_ASSIGN_IN_TASK");
      const newTask = await taskHandlers.addMemberToTask(taskId, userId);
      this.response(res).onSuccess(newTask);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }

  async removeMembersToTask(req, res) {
    const { taskId, userId } = req.body;
    try {
      let errors = await this.getErrorsParameters(
        req,
        ADD_MEMBERS_TO_TASK_SHEME
      );
      if (errors.length > 0) throw new ValidationError(errors);
      const task = await taskHandlers.getTaskById(taskId);
      const listMembersInTask = task.members;
      const isExistTask = listMembersInTask.indexOf(userId);
      if (isExistTask == -1)
        throw new ValidationError("MEMBERS_IS_NOT_IN_TASK");
      const newTask = await taskHandlers.removeMembersToTask(taskId, userId);
      this.response(res).onSuccess(newTask);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }

  async moveTask(req, res) {
    const { taskId, listId } = req.body;
    try {
      let errors = await this.getErrorsParameters(
        req,
        SWITCH_TASK_BETWEEN_TWO_LIST
      );
      if (errors.length > 0) throw new ValidationError(errors);
      const task = await taskHandlers.getTaskById(taskId);
      const list = await listHandler.getListById(listId);
      if (!task) throw new ValidationError("TASK_IS_NOT_EXIST");
      if (!list) throw new ValidationError("LIST_IS_NOT_EXIST");
      if (task.projecId !== list.projectId)
        throw new ValidationError("TASK_IS_NOT_IN_PROJECT");
      if (task.listId === list._id)
        throw new ValidationError("TASK_IS_IN_LIST");
      const newTask = await taskHandlers.moveTask(taskId, listId);
      this.response(res).onSuccess(newTask);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }

  async getTasksByListId(req, res) {
    const { listId } = req.body;
    const { userId } = req;
    try {
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
      const tasks = await taskHandlers.getTasksByListId();
      this.response(res).onSuccess(tasks);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }
}

export default TaskController;
