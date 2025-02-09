"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = successResponse;
exports.failureResponse = failureResponse;
function successResponse(data) {
    return {
        success: true,
        data: data
    };
}
function failureResponse(error) {
    return {
        success: false,
        message: error.message
    };
}
