import {Request, Response} from 'express';
import {failureResponse, successResponse} from '../utils/apiResponse';
import CacheStore from '../utils/CacheStore';
import {ApiResponse} from '../types/apiResponse';
import {AddCachePayload, AddCacheResponse} from '../types/cache';

export const addCache = async (
  req: Request<{}, {}, AddCachePayload>,
  res: Response<ApiResponse<AddCacheResponse>>
) => {
  try {
    const {key, value} = req.body;

    if (!key || !value) {
      res
        .status(400)
        .json(failureResponse(new Error('key and value are required!')));
      return;
    }

    CacheStore.set(key.toString(), value); // stringify the key

    res.status(201).json(successResponse({key, value}));
  } catch (error) {
    res.status(500).json(failureResponse(error as Error));
  }
};

export const getCache = async (
  req: Request<{key: string}, {}, {}>,
  res: Response<ApiResponse<any>>
) => {
  try {
    const {key} = req.params;

    if (!key) {
      res.status(400).json(failureResponse(new Error('key is missing!')));
      return;
    }

    const value = CacheStore.get(key);

    if (!value) {
      res
        .status(404)
        .json(failureResponse(new Error('Key not found in store.')));
      return;
    }

    res.status(201).json(successResponse(value));
  } catch (error) {
    res.status(500).json(failureResponse(error as Error));
  }
};

export const deleteCache = async (
  req: Request<{key: string}, {}, {}>,
  res: Response<ApiResponse<boolean>>
) => {
  try {
    const {key} = req.params;

    if (!key) {
      res.status(400).json(failureResponse(new Error('key is required!')));
      return;
    }

    const deleted = CacheStore.delete(key);

    if (!deleted) {
      res.status(404).json(failureResponse(new Error('Key not found')));
    }

    res.status(200).json(successResponse(deleted));
  } catch (error) {
    res.status(500).json(failureResponse(error as Error));
  }
};
