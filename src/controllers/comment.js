import BaseController from "./base";
import { COMMENT_SHEME } from "../validationSchemes/comment";

import ValidationError from "../errors/validation";

import CommentHandlers from "../handlers/comment";
import TaskHandler from "../handlers/task";
import AuthHandler from "../handlers/auth";
import ProjectHandler from "../handlers/project";

const projectHandler = new ProjectHandler();
const authHandler = new AuthHandler();
const taskHandler = new TaskHandler();
const commentHandlers = new CommentHandlers();

class CommentController extends BaseController {
  async createNewComment(req, res) {
    const { taskId, userId, tag, content } = req.body;
    let errors = await this.getErrorsParameters(req, COMMENT_SHEME);
    if (errors.length > 0) this.response(res).onSuccess("INVALID_ARGUMENT");
    try {
      const user = await authHandler.getUserById(userId);
      if (!user) throw new ValidationError("USER_IS_NOT_EXIST");
      const task = await taskHandler.getTaskById(taskId);
      if (!task) throw new ValidationError("TASK_IS_NOT_EXIST");
      const project = await projectHandler.getProjectById(task.projectId);
      if (!project) throw new ValidationError("PROJECT_IS_NOT_EXIST");
      const membersInProject = project.members;
      if (tag.length > 0) {
        tag.forEach(element => {
          if (membersInProject.indexOf(element) == -1)
            throw new ValidationError("USER_TAG_NOT_IN_PROJECT");
        });
      }
      const newComment = await commentHandlers.createNewComment(
        data.projectId,
        data.name
      );
      this.response(res).onSuccess(newList);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }
}

export default CommentController;
