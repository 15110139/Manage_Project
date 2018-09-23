import BaseController from "./base";
import {
  TASK_SHEME,
  ADD_MEMBERS_TO_TASK_SHEME
} from "../validationSchemes/task";

import ValidationError from "../errors/validation";

import TaskHandlers from "../handlers/task";
import ProjectHandler from "../handlers/project";

const taskHandlers = new TaskHandlers();
const projectHandler = new ProjectHandler();

class TaskController extends BaseController {
  async createNewTask(req, res) {
    const { listTaskId, title,projectId } = req.body;
    try {
      let errors = await this.getErrorsParameters(req, TASK_SHEME);
      if (errors.length > 0) throw new ValidationError(errors);
      const newTask = await taskHandlers.createNewTask(
        listTaskId,
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
      if (isExistTask !== -1) throw new ValidationError("MEMBERS_IS_IN_TASK");
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
}

export default TaskController;
