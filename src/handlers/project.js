import Base from "./base";
//Import models
import ProjectModel from "../models/Project";
import ListModel from "../models/List";

class ProjectHandler extends Base {
  async createNewProject(userId, name, backgroundUrl) {
    const newProject = await ProjectModel.create({
      name,
      backgroundUrl,
      userId,
      members: []
    });
    return newProject;
  }
  async addMembersToProject(projectId, userID) {
    const result = await ProjectModel.updateOne(
      { _id: projectId },
      { $push: { members: userID } }
    );
    return result;
  }
  async getProjectById(projectId) {
    const project = await ProjectModel.findOne({ _id: projectId });
    return project;
  }

  async removeMembersToProject(projectId, userId) {
    console.log("position", userId, projectId);
    const result = await ProjectModel.updateOne(
      { _id: projectId },
      { $pull: { members: userId } }
    );
    return result;
  }

  async getListProjectCreateByUser(userId) {
    const projects = await ProjectModel.find({ userId });
    return projects;
  }
  async getListProjectIsMembers(userId) {
    const projects = await ProjectModel.find({ members: userId });
    return projects;
  }

  async getListAndTaskByProjectId(projectId) {
    const data = await ListModel.aggregate([
      { $match: { projectId: projectId } },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "listId",
          as: "tasks"
        }
      }
    ]);
    return data;
  }
}
export default ProjectHandler;
