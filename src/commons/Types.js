export const StrategyTypes = {
  READY: 'READY',
  RUNNING: 'RUNNING',
  STOPPED: 'STOPPED',
  NOT_ENOUGH_MONEY: 'NOT_ENOUGH_MONEY',
  APIKEY_INVALID: 'APIKEY_INVALID',
  APIKEY_NOT_FOUND: 'APIKEY_NOT_FOUND'
};



export const ActivityTypes = {
  ACTIVE: 'ACTIVE',
  DISABLE: 'DISABLE',
  EXPIRED: 'EXPIRED'
};

export const ExchangeTypes = {
  BITTREX: 'BITTREX',
  BINANCE: 'BINANCE'
};

export const WithdrawTypes = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  WAITING: 'WAITING',
  PENDING : 'PENDING',
  CANCEL: 'CANCEL'
};

export const CoinType = {
  BTC: 'BTC',
  ETH: 'ETH'
};

export const DepositType = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
};

export const CoinOfUSDTMARKET = {
  BCC: 'BCC',
  BNB: 'BNB',
  BTC: 'BTC',
  ETH: 'ETH',
  LTC: 'LTC',
  NEO: 'NEO',
  QTUM: 'QTUM',
  XRP : 'XRP'
};

export const FundHistoryTypes = {
  DEPOSIT : 'DEPOSIT',
  COPYSTRATEGY : 'COPYSTRATEGY',
  FEECOPYSTRATEGY : 'FEECOPYSTRATEGY'
}
export const UpdateFundTypes = {
  ADD : 'ADD',
  SUBTRACT : 'SUBTRACT',
}
export const StatusFuncHistoryTypes = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
}

export const SettingTypes = {
  TARGET : 'TARGET'
}

export const TransactionHistoriesTypes = {
  SEND: 'SEND',
  RECEIVE : 'RECEIVE'
}