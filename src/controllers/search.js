import BaseController from "./base";

import SearchHandler from "../handlers/search";

const searchHandler = new SearchHandler();

class SearchController extends BaseController {
  async searchUser(req, res) {
    const { textSearch, page, limit } = req.query;
    console.log(textSearch, page, limit)
    if (!textSearch) this.response(req).onError("INVALID_ARGUMENT");
    // if (typeof page !== 'number') this.response(req).onError("INVALID_ARGUMENT");
    // if (typeof limit !== 'number') this.response(req).onError("INVALID_ARGUMENT");
    try {
      const listUser = await searchHandler.searchUser(textSearch, Number(page), Number(limit));
      this.response(res).onSuccess(listUser);
    } catch (error) {
      this.response(res).onError(null, error);
    }
  }
}

export default SearchController;
