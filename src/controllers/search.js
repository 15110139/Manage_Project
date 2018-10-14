import BaseController from "./base";

import SearchHandler from "../handlers/search";

const searchHandler = new SearchHandler();

class SearchController extends BaseController {
  async searchUser(req, res) {
    const { textSearch } = req.query;
    if (!textSearch) this.response(req).onError("INVALID_ARGUMENT");
    try {
      const listUser = await searchHandler.searchUser(textSearch);
      this.response(res).onSuccess(listUser);
    } catch (error) {
      this.response(res).onError(null, error);
    }
  }
}

export default SearchController;
