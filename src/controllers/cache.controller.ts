import {Request, Response} from 'express';
import {failureResponse, successResponse} from '../utils/apiResponse';
import CacheStore from '../utils/CacheStore';
import {ApiResponse} from '../types/apiResponse';

export const addCache = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(req.body);
    const {key, value} = req.body;

    if (!key || !value) {
      throw new Error('Key and value are required!');
    }

    CacheStore.set(key, value);

    return res.status(201).json(successResponse({key, value}));
  } catch (error) {
    return res.status(500).json(failureResponse(error as Error));
  }
};

export const getCache = async (req: Request, res: Response): Promise<any> => {
  try {
    const {key} = req.params;

    if (!key) {
      throw new Error('Key is missing!');
    }

    const value = CacheStore.get(key);

    if (!value) {
      return res
        .status(404)
        .json(failureResponse(new Error('Key not found in store.')));
    } else {
      return res.status(201).json(successResponse(value));
    }
  } catch (error) {
    return res.status(500).json(failureResponse(error as Error));
  }
};

export const deleteCache = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {key} = req.params;

    if (!key) {
      return res
        .status(400)
        .json(failureResponse(new Error('Key and value are required!')));
    }

    const deleted = CacheStore.delete(key);

    if (!deleted) {
      return res.status(404).json(failureResponse(new Error('Key not found')));
    } else {
      return res.status(200).json(successResponse('Deleted successfully!'));
    }
  } catch (error) {
    return failureResponse(error as Error);
  }
};
