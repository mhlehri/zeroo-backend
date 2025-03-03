import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createReviewIntoDB,
  deleteReviewByIdFormDB,
  getReviewsFromDB,
  updateReviewIsShownIntoDB,
} from "./inventory.service";
import { RequestHandler } from "express";
import AppError from "../../errors/AppError";

export const addSize = catchAsync(async (req, res) => {});
export const addTag = catchAsync(async (req, res) => {});

export const getTag = catchAsync(async (req, res) => {});
export const getSize = catchAsync(async (req, res) => {});

export const deleteTag: RequestHandler = catchAsync(async (req, res) => {});
export const deleteSize: RequestHandler = catchAsync(async (req, res) => {});

export const updateSize = catchAsync(async (req, res) => {});
export const updateTag = catchAsync(async (req, res) => {});
