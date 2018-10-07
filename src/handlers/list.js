import Base from "./base";
//Import models
import ListModel from "../models/List";

class ListHandlers extends Base {
  async createNewList(projectId, name) {
    const newList = await ListModel.create({
      projectId,
      name
    });
    return newList;
  }
  async removeTask(listId) {
    await ListModel.remove({ _id: listId });
  }
  async getListById(listId) {
    const list = await ListModel.findOne({ _id: listId });
    return list;
  }
  async updateList(listId, name) {
    const newList = await ListModel.updateOne({ _id: listId }, { name });
    return newList;
  }

  async getListsByProjectId(projectId) {
    const lists = await ListModel.find({ projectId });
    return lists;
  }
  //
}
export default ListHandlers;
