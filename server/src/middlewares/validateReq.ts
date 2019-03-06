import { validationResult } from 'express-validator/check';
import { requestType } from '../types/requestType';
import { Response, NextFunction } from 'express';

const validateReq = (req: requestType, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	res;
	if (!errors.isEmpty()) {
		const error: any = new Error('Validation failed');
		error.statusCode = 422;
		error.data = errors.array();
		return next(error);
	}
	next();
};

export default validateReq;
