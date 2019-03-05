import { userType } from '../models/modelsType';
import { Request } from 'express';

export interface requestType extends Request {
	user: userType;
}
