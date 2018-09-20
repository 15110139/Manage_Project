export const CREATE_WHITELIST = {
    asset: {
        notEmpty: {
            errorMessage: "ASSET_IS_EMPTY"
        },
        matches: {
            options: [/\b(?:BTC|ETH)\b/],
            errorMessage: "INVALID_ASSET"
        }
    },
    address: {
        notEmpty: {
            errorMessage: "ADDRESS_IS_EMPTY"
        },
    }

};

export const DELETE_WHITELIST = {
    whitelistId: {
        notEmpty: {
            errorMessage: "WHITE_LIST_ID_IS_EMPTY"
        },
        isMongoId: {
            errorMessage: "WHITE_LIST_ID_IS_INVALID"

        }
    }
};