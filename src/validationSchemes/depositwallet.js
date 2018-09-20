export const CREATE_DEPOSIT_WALLET = {
  asset: {
    notEmpty: {
      errorMessage: "ASSET_IS_EMPTY"
    }
  },
  addressWallet: {
    notEmpty: {
      errorMessage: "WALLET_ID_IS_EMPTY"
    }
  }
};

export const CREATE_WALLET = {
  currency: {
    notEmpty: {
      errorMessage: "CURRENCY_IS_EMPTY"
    },
    matches: {
      options: [/\b(?:BTC|ETH|LTC|BCH)\b/],
      errorMessage: "INVALID_ROLE"
    }
  }
};
