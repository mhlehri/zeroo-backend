import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createUserIntoDB, getUserFromDB } from "./user.service";

//? This function is used to handle the request to create a user
export const createUser = catchAsync(async (req, res) => {
  const result = await createUserIntoDB(req.body);
  sendResponse(res, {
    message: "User registered successfully",
    data: result,
  });
});

//? This function is used to handle the request to get a user
export const getUser = catchAsync(async (req, res) => {
  const result = await getUserFromDB(req.body);
  res
    .cookie("token", result?.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      token: result?.token,
      data: result?.result,
    });
});
