import { Request } from 'express';

export interface StandardRequest extends Request {
	serviceId: string;
}
