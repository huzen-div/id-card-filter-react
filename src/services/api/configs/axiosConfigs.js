import axios from "axios";
import { JSON_PLACEHOLDER_SERVICE } from "../../../utils/constants";

export const client = axios.create({
  withCredentials: true,
  baseURL: `${JSON_PLACEHOLDER_SERVICE}`,
})

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error)
  }

  return Promise.reject(error)
}

// registering the custom error handler to the
// "api" axios instance
client.interceptors.response.use(undefined, (error) => {
  return errorHandler(error)
})