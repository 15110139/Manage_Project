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
  async removeList(listId) {
    await ListModel.remove({ _id: listId });
  }
  async getListById(listId) {
    const list = await ListModel.findOne({ _id: listId });
    console.log(listId)
    return list;
  }
  async updateList(listId, name) {
    const newList = await ListModel.updateOne({ _id: listId }, { name });
    return newList;
  }

  async getListByName(listName) {
    const list = await ListModel.findOne({ name: listName });
    return list;
  }

  async getListsByProjectId(projectId) {
    const lists = await ListModel.find({ projectId });
    return lists;
  }
  async removeListByProjectId(projectId) {
    await ListModel.remove({ projectId: projectId })
  }
  //
}
export default ListHandlers;
