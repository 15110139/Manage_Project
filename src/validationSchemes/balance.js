export const DEPOSIT_VALIDATE_SHEME = {
    txId: {
        notEmpty: true,
        errorMessage: "TXID_NOT_EMPTY"
    },
    asset: {
        notEmpty: true,
        errorMessage: "ASSET_NOT_EMPTY"
    }
}

export const WITHDRAW_VALIDATE_SHEME = {
    address: {
        notEmpty: true,
        errorMessage: "ADDRESS_NOT_EMPTY"
    },
    coinAsset: {
        notEmpty: true,
        errorMessage: "COIN_ASSET_NOT_EMPTY"
    },
    amount: {
        notEmpty: {
            errorMessage: "AMOUNT_NOT_EMPTY"
        },
        isFloat: {
            options: { gt: 0 },
            errorMessage: "AMOUNT_GREATER_0"
        }
    },
}

export const TRANSFER_VALIDATE_SCHEMA = {
    address: {
        notEmpty: {
            errorMessage: "ADDRESS_NOT_EMPTY"
        },
        isMongoId : {
            errorMessage: "ADDRESS_INVALID"
        }

    },
    amount: {
        notEmpty: {
            errorMessage: "AMOUNT_NOT_EMPTY",
        },
        isFloat: {
            options: { gt: 0 },
            errorMessage: "AMOUNT_GREATER_0"
        }
    }
}
