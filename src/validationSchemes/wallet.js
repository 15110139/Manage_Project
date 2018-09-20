export const VALIDATE_COIN_ASSET = {
  coinAsset: {
    notEmpty: {
      errorMessage: "COIN_ASSET_NOT_EMPTY"
    },
    matches: {
      options: [/\b(?:BTC|BBC|ETH|LTC)\b/],
      errorMessage: "INVALID_COIN_ASSET"
    }
  }
};

export const VALIDATE_ADDRESS_WALLET = {
  address: {
    notEmpty: {
      errorMessage: "ADDRESS_NOT_EMPTY"
    }
  }
};

export const VALIDATE_COIN_AMOUNT = {
  amount: {
    notEmpty: {
      errorMessage: "COIN_AMOUNT_NOT_EMPTY"
    },
    isFloat: {
      errorMessage: "COIN_AMOUNT_NOT_VALID"
    }
  }
};

export const VALIDATE_AMOUNT_USDT = {
  amountUSDT: {
    notEmpty: {
      errorMessage: "COIN_AMOUNT_NOT_EMPTY"
    },
    isFloat: {
      errorMessage: "COIN_AMOUNT_NOT_VALID"
    }
  }
};

export const VALIDATE_WALLET_ID = {
  walletId: {
    notEmpty: {
      errorMessage: "WALLET_ID_NOT_EMPTY"
    },
    isMongoId: {
      errorMessage: "WALLET_ID_NOT_VALID"
    }
  }
}