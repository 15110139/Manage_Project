import Base from "./base";
//Import models
import NotifycationModel from "../models/Notifycaion";

class NotifycationHandlers extends Base {
  async createNewNotificationCreateNewTask(projectId,userId, nameList, title) {
    const newNotifycation = await NotifycationModel.create({
      projectId,
      userId,
      content: `add new task ${title} in ${nameList}`
    });
    return newNotifycation;
  }
}
export default NotifycationHandlers;
