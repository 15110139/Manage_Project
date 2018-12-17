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
import ActiveHandler from "../handlers/active";
const activeHandler = new ActiveHandler();
const taskHandlers = new TaskHandlers();
const projectHandler = new ProjectHandler();
const listHandler = new ListHandler();

class TaskController extends BaseController {
  async createNewTask(req, res) {
    const { listId, name, projectId } = req.body;
    const { userId } = req;
    let errors = await this.getErrorsParameters(req, TASK_SHEME);
    if (errors.length > 0) this.response(res).onError("INVALID_ARGUMENT");
    try {
      // const task = await taskHandlers.getTaskByName(name);
      // if (task) throw new ValidationError("DUPLICATE_NAME");
      const project = await projectHandler.getProjectById(projectId);
      if (!project) throw new ValidationError("PROJECT_IS_NOT_EXIST");
      const list = await listHandler.getListById(listId);
      if (!list) throw new ValidationError("LIST_IS_NOT_EXIST");
      const listTask = await taskHandlers.getTasksByListId(listId);
      const newTask = await taskHandlers.createNewTask(
        listId,
        projectId,
        name,
        listTask.length
      );
      await activeHandler.createNewActive(
        "ADD_TASK_TO_LIST",
        projectId,
        newTask._id,
        userId,
        listId,
        null,
        null
      );
      this.response(res).onSuccess(newTask);
    } catch (errors) {
      this.response(res).onError(null, errors);
    }
  }

  async addMemberToTask(req, res) {
    const { taskId, userId } = req.body;
    let errors = await this.getErrorsParameters(req, ADD_MEMBERS_TO_TASK_SHEME);
    if (errors.length > 0) this.response(res).onError("INVALID_ARGUMENT");
    try {
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
      if (req.userId === userId) {
        await activeHandler.createNewActive(
          "ASSIGN_ME_TO_TASK",
          project._id,
          taskId,
          req.userId,
          null,
          null,
          null
        );
      } else {
        await activeHandler.createNewActive(
          "ASSIGN_MEMBERS_TO_TASK",
          project._id,
          taskId,
          req.userId,
          null,
          userId,
          null
        );
      }
      this.response(res).onSuccess(newTask);
    } catch (errors) {
      this.response(res).onError(null, errors);
    }
  }

  async removeMembersToTask(req, res) {
    const { taskId, userId } = req.body;
    let errors = await this.getErrorsParameters(req, ADD_MEMBERS_TO_TASK_SHEME);
    if (errors.length > 0) this.response(res).onError("INVALID_ARGUMENT");
    try {
      const task = await taskHandlers.getTaskById(taskId);
      const listMembersInTask = task.members;
      const isExistTask = listMembersInTask.indexOf(userId);
      if (isExistTask == -1)
        throw new ValidationError("MEMBERS_IS_NOT_IN_TASK");
      const newTask = await taskHandlers.removeMembersToTask(taskId, userId);
      if (req.userId === userId) {
        await activeHandler.createNewActive(
          "REMOVE_ME_TO_TASK",
          project._id,
          taskId,
          req.userId,
          null,
          null,
          null
        );
      } else {
        await activeHandler.createNewActive(
          "REMOVE_MEMBERS_TO_TASK",
          project._id,
          taskId,
          req.userId,
          null,
          userId,
          null
        );
      }
      this.response(res).onSuccess(newTask);
    } catch (errors) {
      this.response(res).onError(null, errors);
    }
  }

  async moveTask(req, res) {
    const { taskId, listId, position } = req.body;
    let errors = await this.getErrorsParameters(
      req,
      SWITCH_TASK_BETWEEN_TWO_LIST
    );
    if (errors.length > 0) this.response(res).onError("INVALID_ARGUMENT");
    if (parseInt(position) < 0) this.response(res).onError("INVALID_ARGUMENT");
    try {
      const task = await taskHandlers.getTaskById(taskId);
      const list = await listHandler.getListById(listId);
      // if (!task) throw new ValidationError("TASK_IS_NOT_EXIST");
      // if (!list) throw new ValidationError("LIST_IS_NOT_EXIST");
      // if (task.projecId !== list.projectId)
      //   throw new ValidationError("TASK_IS_NOT_IN_PROJECT");
      console.log(listId, task.listId)
      if (task.listId !== listId) {
        console.log(listId)
        console.log('khac list')
        await taskHandlers.updatePositionNonAsList(listId, taskId, position)
        await taskHandlers.updatePositionListNew(listId, taskId, position)
        await taskHandlers.updatePositionListOld(task.listId, task.position)
        // await activeHandler.createNewActive(
        //   "MOVE_TASK",
        //   project._id,
        //   taskId,
        //   req.userId,
        //   task.listId,
        //   null,
        //   listId
        // );
      } else {
        console.log('cung list', task.position, position)
        if (task.position < position) {
          console.log("position cu < position moi")
          console.log("position cu", task.position)
          console.log("position moi", position)
          await taskHandlers.updatePositionAsList(listId, taskId, position)
          await taskHandlers.updatePositionTaskInList1(listId, taskId, task.position, position, -1)
        } else {
          console.log("position cu > position moi")
          console.log("position cu", task.position)
          console.log("position moi", position)
          await taskHandlers.updatePositionAsList(listId, taskId, position)
          await taskHandlers.updatePositionTaskInList2(listId, taskId, task.position, position, 1)
        }
      }
      this.response(res).onSuccess();
    } catch (errors) {
      this.response(res).onError(null, errors);
    }
  }


  async getTasksByListId(req, res) {
    const { listId } = req.params;
    const { userId } = req;
    if (!listId) this.response(res).onError("INVALID_ARGUMENT");
    try {
      const list = await listHandler.getListById(listId);
      if (!list) throw new ValidationError("LIST_IS_NOT_EXIST");
      const project = await projectHandler.getProjectById(list.projectId);
      if (!project) throw new ValidationError("PROJECT_IS_NOT_EXIST");
      if (project.userId !== userId) {
        const membersInProject = project.members;
        if (membersInProject.indexOf(userId) == -1)
          throw new ValidationError("USER_IS_NOT_IN_PROJECT");
      }
      const tasks = await taskHandlers.getTasksByListId(listId);
      this.response(res).onSuccess(tasks);
    } catch (errors) {
      this.response(res).onError(null, errors);
    }
  }

  async removeTask(req, res) {
    const { taskId } = req.params
    if (!taskId) this.response(res).onError("INVALID_ARGUMENT");
    try {
      const task = await taskHandlers.getTaskById(taskId)
      if (!task) throw new ValidationError("TASK_IS_NOT_EXIST");
      await taskHandlers.removeTask(taskId)
      this.response(res).onSuccess()
    } catch (error) {
      this.response(res).onError(null, error)
    }
  }
}

export default TaskController;
