import BaseController from "./base";
import { LIST_SHEME, UPDATE_LIST_SHEME } from "../validationSchemes/list";

import ValidationError from "../errors/validation";

import ListHandlers from "../handlers/list";

const listHandlers = new ListHandlers();

class ListController extends BaseController {
  async createNewList(req, res) {
    const data = req.body;
    try {
      let errors = await this.getErrorsParameters(req, LIST_SHEME);
      if (errors.length > 0) throw new ValidationError(errors);
      const newList = await listHandlers.createNewList(
        data.projectId,
        data.name
      );
      this.response(res).onSuccess(newList);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }

  async removeList(req, res) {
    const data = req.body;
    try {
      let errors = await this.getErrorsParameters(req, LIST_SHEME);
      if (errors.length > 0) throw new ValidationError(errors);
      await listHandlers.removeList(data.listId);
      this.response(res).onSuccess();
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }

  async updateList(req, res) {
    const { listId, name } = req.body;
    try {
      let errors = await this.getErrorsParameters(req, UPDATE_LIST_SHEME);
      if (errors.length > 0) throw new ValidationError(errors);
      const list = await listHandlers.getListById(listId);
      if (!list) throw new ValidationError("LIST_IS_NOT_EXIST");
      const newList = await listHandlers.updateList(listId, name);
      this.response(res).onSuccess(newList);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }
}

export default ListController;
