import ValidationError from "../../errors/validation";
import Base from "../base";
import WithDrawRequestModel from "../../models/WithDrawRequest";
import { WithdrawTypes } from "../../commons/Types";

//Import models

class WithdrawHandler extends Base {
  async getAllWithdrawRequest(req, res, next) {
    let requests = await WithDrawRequestModel.find({ status: { $ne: "CANCEL" } }).populate("userId").sort({ createdAt: - 1 });
    return requests;
  }

  async isWithdrawValid(withDrawId) {
    let request = await WithDrawRequestModel.findOne({ _id: withDrawId, status: WithdrawTypes.WAITING });
    if (!request) return false;
    return true;
  }

  async confirmWithDraw(withDrawId, adminId, type) {
    let request;
    if (type == 'APPROVE')
      request = await this.approveWithDraw(withDrawId, adminId);
    else
      request = await this.denyWithDraw(withDrawId, adminId);
    return request;
  }

  async approveWithDraw(withDrawId, adminId) {
    let update = await WithDrawRequestModel.update({ _id: withDrawId, status: WithdrawTypes.WAITING }, {
      status: WithdrawTypes.SUCCESS,
      confirmBy: adminId
    });
    return await WithDrawRequestModel.findById(withDrawId);
  }

  async denyWithDraw(withDrawId, adminId) {
    let update = await WithDrawRequestModel.update({ _id: withDrawId, status: WithdrawTypes.WAITING }, {
      status: WithdrawTypes.FAILURE,
      confirmBy: adminId,
    });
    return await WithDrawRequestModel.findById(withDrawId);
  }
}
export default WithdrawHandler;