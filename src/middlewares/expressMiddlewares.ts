import { NextFunction, Request, Response } from 'express';
import { validationResult, body, param } from 'express-validator';

const validateData = (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ status: false, message: errors.array() });
    }

    next();
};

export const validateBodyData = (dataKey: string[]) => dataKey.map((key) => body(key, `${key} is required`).exists());

export const validateParamData = (dataKey: string[]) => dataKey.map((key) => param(key, `${key} is required`).exists());

export default validateData;
