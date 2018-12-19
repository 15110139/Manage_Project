import Base from "./base";
//Import models
import ListModel from "../models/List";

class ListHandlers extends Base {
  async createNewList(projectId, name, position) {
    const newList = await ListModel.create({
      projectId,
      name, position
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
    const lists = await ListModel.find({ projectId }).sort({ position: 1 });
    return lists;
  }
  async removeListByProjectId(projectId) {
    await ListModel.remove({ projectId: projectId })
  }
  async updatePositionList(listId, position) {
    await ListModel.updateOne({ _id: listId }, { position })
  }
  async updatePositionListInProject2(projectId, lisId, oldPosition, newPosition, val) {
    console.log(2)

    console.log(await ListModel.find({
      _id: { $ne: lisId },
      projectId: projectId,
      position: { $lt: oldPosition, $gte: newPosition }
    }))
    await ListModel.updateMany({
      _id: { $ne: lisId },
      projectId: projectId,
      position: { $lt: oldPosition, $gte: newPosition }
    }, { $inc: { position: val } })
  }

  async updatePositionListInProject1(projectId, lisId, oldPosition, newPosition, val) {
    console.log(1)
    console.log(await ListModel.find({
      _id: { $ne: lisId },
      projectId: projectId,
      position: { $lte: newPosition, $gte: oldPosition }
    }))
    await ListModel.updateMany({
      _id: { $ne: lisId },
      projectId: projectId,
      position: { $lte: newPosition, $gte: oldPosition }
    }, { $inc: { position: val } })
  }
}
export default ListHandlers;
