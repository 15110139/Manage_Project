import BaseController from "./base";

import SearchHandler from "../handlers/search";

const searchHandler = new SearchHandler();

class SearchController extends BaseController {
  async searchUser(req, res) {
    const { textSearch, pageIndex, pageSize } = req.query;
    console.log(textSearch,typeof pageIndex, typeof pageSize)
    try {
      const listUser = await searchHandler.searchUser(textSearch, Number(pageIndex+1), Number(pageSize));
      this.response(res).onSuccess(listUser);
    } catch (error) {
      this.response(res).onError(null, error);
    }
  }
}

export default SearchController;
