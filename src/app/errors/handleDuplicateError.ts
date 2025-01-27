/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorMessages, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(
    /index:\s(\w+)_\d+\sdup\skey:\s{\s(\w+):\s"([^"]+)"\s}/
  );

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];
  const message = `${extractedMessage} is already exists`;

  const errorMessages: TErrorMessages = [
    {
      path: "",
      message: `${message}`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message,
    errorMessages,
  };
};

export default handleDuplicateError;
