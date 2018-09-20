export const CREATE_BLACKLIST = {
	type: {
		notEmpty: {
			errorMessage: "TYPE_IS_EMPTY"
		},
		matches: {
			options: [/\b(?:IP|DOMAIN)\b/],
			errorMessage: "INVALID_ROLE"
		}
	}
};
