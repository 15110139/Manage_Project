import Base from "./base";
//Import models
import ProjectModel from "../models/Project";

class ProjectHandler extends Base {
  async createNewProject(userId, name, backgroundUrl) {
    let newProject = await ProjectModel.create({
      name,
      backgroundUrl,
      userId,
      members: []
    });
    return newProject;
  }

  //
}
export default ProjectHandler;
