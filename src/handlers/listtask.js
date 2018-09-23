import Base from "./base";
//Import models
import ListTaskModel from "../models/ListTask";

class ListTaskHandlers extends Base {
  async createNewListTask(projectId, name) {
    const newListTask = await ListTaskModel.create({
      projectId,
      name
    });
    return newListTask;
  }
  async removeListTask(listTaskId) {
    await ListTaskModel.remove({ _id: listTaskId });
  }
  //
}
export default ListTaskHandlers;
