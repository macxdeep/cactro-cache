import {NextFunction, Request, Response} from 'express';
import {failureResponse} from '../utils/apiResponse';

export const apiKeyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const API_KEY = process.env.API_KEY_VALUE;

    if (!API_KEY) {
      throw new Error('API_KEY_VALUE is undefined!');
    }

    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== API_KEY) {
      return res
        .status(401)
        .json(failureResponse(new Error('Invalid API KEY!')));
    }

    next();
  } catch (error) {
    console.error(`Error in apiKeyMiddleware: ${error}`);

    return res.status(500).json(failureResponse(error as Error));
  }
};
