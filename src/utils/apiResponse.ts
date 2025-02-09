import {ApiResponse} from '../types/apiResponse';

export function successResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data: data
  };
}

export function failureResponse(error: Error): ApiResponse<any> {
  return {
    success: false,
    message: error.message
  };
}
