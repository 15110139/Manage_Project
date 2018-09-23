import Base from "./base";
//Import models
import TaskModel from "../models/Task";

class TaskHandler extends Base {
  async createNewTask(listTaskId, projectId, title) {
    const newTask = await TaskModel.create({
      title,
      projectId,
      listTaskId,
      members: [],
      describe: ""
    });
    return newTask;
  }
  async getTaskById(taskId) {
    const task = await TaskModel.findOne({ _id: taskId });
    return task;
  }

  async addMemberToTask(taskId, userId) {
    const result = await TaskModel.updateOne(
      { _id: taskId },
      { $push: { members: userId } }
    );
    return result;
  }

  async removeMembersToTask(taskId, userId) {
    console.log("position", userId, taskId);
    const result = await TaskModel.updateOne(
      { _id: taskId },
      { $pull: { members: userId } }
    );
    return result;
  }
}
export default TaskHandler;
