import Base from "./base";
import UserModel from "../models/User";

class SearchHandler extends Base {
  async searchUser(textSearch, page, limit) {
    return String(textSearch).length == 0 ? await UserModel.paginate({}, {
      sort: { email: 1 }, select: {
        _id: 1,
        email: 1,
        username: 1,
        avatarUrl: 1,
        lastName: 1,
        firstName: 1
      }, page: page, limit: limit
    })
      : await UserModel.paginate({
        $or: [
          { username: { $regex: textSearch, $options: "i" } }, //find by username
          { email: { $regex: textSearch, $options: "i" } }, //find by email
          { firstName: { $regex: textSearch, $options: "i" } }, //find by full name
          { lastName: { $regex: textSearch, $options: "i" } },
          { fullName: { $regex: textSearch, $options: "i" } } // find by phone number
        ]
      }, {
          sort: { email: 1 }, select: {
            _id: 1,
            email: 1,
            username: 1,
            avatarUrl: 1,
            lastName: 1,
            firstName: 1
          }, page: page, limit: limit
        });
    // const listUser = await UserModel.find({ $text: { $search: textSearch } })
  }
}

export default SearchHandler;
