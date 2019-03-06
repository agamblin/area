import userType from '../types/userType';
import { Request } from 'express';

export interface requestType extends Request {
	user: userType;
}
