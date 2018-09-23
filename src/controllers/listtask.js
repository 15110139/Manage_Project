import BaseController from "./base";
import { LIST_TASK_SHEME } from "../validationSchemes/listtask";

import ValidationError from "../errors/validation";

import ListTaskHandlers from "../handlers/listtask";

const listTaskHandlers = new ListTaskHandlers();

class ListTaskController extends BaseController {
  async createNewListTask(req, res) {
    const data = req.body;
    try {
      let errors = await this.getErrorsParameters(req, LIST_TASK_SHEME);
      if (errors.length > 0) throw new ValidationError(errors);
      const newListTask = await listTaskHandlers.createNewListTask(
        data.projectId,
        data.name
      );
      this.response(res).onSuccess(newListTask);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }

  async removeListTask() {
    const data = req.body;
    try {
      let errors = await this.getErrorsParameters(req, LIST_TASK_SHEME);
      if (errors.length > 0) throw new ValidationError(errors);
      await listTaskHandlers.removeListTask(data.listTaskId);
      this.response(res).onSuccess();
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }
}

export default ListTaskController;
