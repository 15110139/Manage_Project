import Base from "../base";
import ValidationError from "../../errors/validation";
// Import models

import InvestHandle from "../../handlers/invest";
import AuthHandler from "../../handlers/auth";
import BalanceHandler from "../../handlers/balance";
import CommissionHandler from "../commission";
import WalletHandler from "../wallet";
import BinaryTreeHandler from "../binarytree";

var investHandle = new InvestHandle();
var authHandler = new AuthHandler();
var balanceHandler = new BalanceHandler();
var commissionHandler = new CommissionHandler();
var walletHandler = new WalletHandler();
var binaryTreeHandler = new BinaryTreeHandler();
class StatisticHandler extends Base {
  constructor() {
    super();
  }

  async getStatistic() {
    let totalMembers = await authHandler.countUsers();
    let totalAvailableBalance = await balanceHandler.getTotalBalance();
    let totalToken = await walletHandler.getTotalToken();
    let totalCommission = await commissionHandler.getTotalCommission();
    let totalCommissionWithdrawSuccess = await commissionHandler.getTotalCommissionWithdrawSuccess();
    let totalRevenue = await binaryTreeHandler.getTotalRevenue();
    let totalDeposit = await balanceHandler.getTotalDeposit();
    return {
      totalAvailableBalance,
      totalCommission,
      totalCommissionWithdrawSuccess,
      totalMembers,
      totalRevenue,
      totalToken,
      totalDeposit
    };
  }
}
export default StatisticHandler;
