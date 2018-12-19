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
    let errors = await this.getErrorsParameters(req, LIST_SHEME);
    if (errors.length > 0) this.response(res).onError("INVALID_ARGUMENT");
    try {
      const project = await projectHandler.getProjectById(projectId);
      if (!project) throw new ValidationError("PROJECT_IS_NOT_EXIST");
      if (project.userId !== userId) {
        const membersInProject = project.members;
        if (membersInProject.indexOf(userId) == -1)
          throw new ValidationError("USER_IS_NOT_IN_PROJECT");
      }
      const lists = await listHandlers.getListsByProjectId(projectId)
      // const list = await listHandlers.getListByName(name);
      // if (list) throw new ValidationError("DUPLICATE_NAME");
      const newList = await listHandlers.createNewList(projectId, name, lists.length);
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
      this.response(res).onError(null, errors);
    }
  }

  // async removeList(req, res) {
  //   const { listId } = req.body;
  //   if (!listId) this.response(res).onError("INVALID_ARGUMENT");
  //   try {
  //     if (!listId) throw new ValidationError("LIST_ID_IS_NOT_EMPTY");
  //     const list = await listHandler.getListById(listId);
  //     if (!list) throw new ValidationError("LIST_IS_NOT_EXIST");
  //     const project = await projectHandler.getProjectById(list.projectId);
  //     if (!project) throw new ValidationError("PROJECT_IS_NOT_EXIST");
  //     if (project.userId !== userId) {
  //       const membersInProject = project.members;
  //       if (membersInProject.indexOf(userId) == -1)
  //         throw new ValidationError("USER_IS_NOT_IN_PROJECT");
  //     }
  //     await listHandlers.removeList(listId)
  //     await taskHandler.removeTaskByListId(listId)
  //     this.response(res).onSuccess();
  //   } catch (errors) {
  //     this.response(res).onError(null, errors);
  //   }
  // }

  async updateList(req, res) {
    const { listId, name } = req.body;
    const { userId } = req;
    let errors = await this.getErrorsParameters(req, UPDATE_LIST_SHEME);
    if (errors.length > 0) this.response(res).onError("INVALID_ARGUMENT");
    try {
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
      this.response(res).onError(null, errors);
    }
  }

  async getListsByProjectId(req, res) {
    const { projectId } = req.params;
    const { userId } = req;
    if (!projectId) this.response(res).onError("INVALID_ARGUMENT");
    try {
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
      this.response(res).onError(null, errors);
    }
  }

  async removeList(req, res) {
    const { listId } = req.params
    if (!listId) this.response(res).onError("INVALID_ARGUMENT");
    try {
      const list = await listHandlers.getListById(listId)
      if (!list) throw new ValidationError("LIST_IS_NOT_EXIST");
      await listHandlers.removeList(listId)
      await taskHandler.removeTaskByListId(listId)
      this.response(res).onSuccess();
    } catch (error) {
      this.response(res).onError(null, error);
    }

  }

  async moveList(req, res) {
    const { listId, position } = req.body
    console.log("show----------", listId, position)
    // if (!listId) this.response(res).onError("INVALID_ARGUMENT");
    // if (!position) this.response(res).onError("INVALID_ARGUMENT");
    try {
      const list = await listHandlers.getListById(listId)
      if (!list) throw new ValidationError("LIST_IS_NOT_EXIST");
      const lists = await listHandlers.getListsByProjectId(list.projectId)
      if (lists.length - 1 < position) {
        if (!list) throw new ValidationError("POSITION_IS_NOT_EXIST");
      }
      await listHandlers.updatePositionList(listId, position)
      console.log(list.name)
      if (list.position < position) {
        console.log("movelist")
        console.log("position cu < position moi")
        console.log("position cu", list.position)
        console.log("position moi", position)
        await listHandlers.updatePositionListInProject1(list.projectId, listId, list.position, position, -1)
      } else {
        console.log("movelist")
        console.log("position cu > position moi")
        console.log("position cu", list.position)
        console.log("position moi", position)
        await listHandlers.updatePositionListInProject2(list.projectId, listId, list.position, position, 1)
      }
      this.response(res).onSuccess();
    } catch (error) {
      this.response(res).onError(null, error)
    }
  }
}

export default ListController;
