const { validationResult } = require('express-validator');

export const handleInputErrors = (req, res, next) => {
	// Check for validation errors
	const errors = validationResult(req);
	console.log(errors);

	// If there are validation errors, send a 400 response with the errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};
