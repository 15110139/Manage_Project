import Base from "./base";
//Import models
import ActivetModel from "../models/Active";

class ActivetHandler extends Base {
  async createNewActive(
    type,
    projectId,
    taskId,
    activeByUserId,
    listId,
    userId,
    listIdToMove
  ) {
    const newActive = await ActivetModel.create({
      type,
      projectId,
      taskId,
      activeByUserId,
      listId,
      userId,
      listIdToMove
    });
    return newActive;
  }

  //
}
export default ActivetHandler;
