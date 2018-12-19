import Base from "./base";
//Import models
import TaskModel from "../models/Task";

class TaskHandler extends Base {
  async createNewTask(listId, projectId, name, position) {
    const newTask = await TaskModel.create({
      name,
      position,
      projectId,
      listId,
      members: [],
      describe: ""
    });
    return newTask;
  }
  async getTaskByName(taskName) {
    const task = await TaskModel.findOne({ name: taskName });
    return task;
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
    const result = await TaskModel.updateOne(
      { _id: taskId },
      { $pull: { members: userId } }
    );
    return result;
  }
  async moveTask(taskId, listId) {
    const newTask = await TaskModel.updateOne(
      { _id: taskId },
      { listId: listId },
      {
        position: position
      }
    );
    return newTask;
  }

  async updatePositionAsList(listId, taskId, position) {
    await TaskModel.updateOne(
      {
        _id: taskId,
        listId: listId
      },
      {
        position
      }
    );
  }

  async updatePositionTaskInList1(listId, taskId, oldposition, newposition, val) {
    console.log(await TaskModel.find({
      _id: { $ne: taskId },
      listId: listId,
      position: { $lte: newposition, $gt: oldposition }
    }))
    await TaskModel.updateMany({
      _id: { $ne: taskId },
      listId: listId,
      position: { $lte: newposition, $gt: oldposition }
    }, {
        $inc: { position: val }
      })
  }

  async updatePositionTaskInList2(listId, taskId, oldposition, newposition, val) {
    console.log(await TaskModel.find({
      _id: { $ne: taskId },
      listId: listId,
      position: { $lt: oldposition, $gte: newposition }
    }))
    await TaskModel.updateMany({
      _id: { $ne: taskId },
      listId: listId,
      position: { $lt: oldposition, $gte: newposition }
    }, {
        $inc: { position: val }
      })
  }



  async updatePositionNonAsList(listId, taskId, position) {
    await TaskModel.updateOne(
      {
        _id: taskId,
      },
      {
        position,
        listId: listId
      }
    );
  }
  async updatePositionListNew(listId, taskId, newposition) {
    await TaskModel.updateMany({
      _id: { $ne: taskId },
      listId: listId,
      position: { $gte: newposition }
    }, {
        $inc: { position: 1 }
      })
  }
  async updatePositionListOld(listId, oldposition) {
    await TaskModel.updateMany({
      listId: listId,
      position: { $gte: oldposition }
    }, {
        $inc: { position: -1 }
      })
  }
  async getTasksByListId(listId) {
    const tasks = await TaskModel.find({ listId }).sort({ position: 1 })
    return tasks;
  }

  async getTasksByProjectId(projectId) {
    const tasks = await TaskModel.find({ projectId: projectId })
    return tasks
  }
  async removeTask(taskId) {
    await TaskModel.remove({ _id: taskId })
  }
  async removeTaskByListId(listId) {
    await TaskModel.remove({ listId: listId })
  }

  async removeTaskByProjectId(projectId) {
    await TaskModel.remove({ projectId: projectId })
  }
}
export default TaskHandler;
