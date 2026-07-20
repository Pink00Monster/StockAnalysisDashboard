import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (!axios.isAxiosError(error)) {
    toast.warning("An unexpected error occurred.");
    console.error("Non-Axios error:", error);
    return;
  }

  const err = error.response;

  // No response at all (network error, backend down, CORS blocked, etc.)
  if (!err) {
    toast.warning("Could not reach the server. Please check your connection and try again.");
    console.error("No response received:", error);
    return;
  }

  const responseData = err.data;

  // Case 1: errors is an array of objects with a description field
  if (Array.isArray(responseData?.errors) && responseData.errors.length > 0) {
    for (let val of responseData.errors) {
      toast.warning(val.description ?? "An error occurred.");
    }
    return;
  }

  // Case 2: errors is an object map of field -> messages[]
  if (responseData?.errors && typeof responseData.errors === "object") {
    const entries = Object.entries(responseData.errors);
    if (entries.length > 0) {
      for (let [, messages] of entries) {
        const msg = Array.isArray(messages) ? messages[0] : messages;
        toast.warning(String(msg ?? "An error occurred."));
      }
      return;
    }
  }

  // Case 3: responseData is a non-empty string
  if (typeof responseData === "string" && responseData.trim().length > 0) {
    toast.warning(responseData);
    return;
  }

  // Case 4: responseData is an object with a common message field (e.g. ProblemDetails)
  if (responseData && typeof responseData === "object") {
    const msg = responseData.title ?? responseData.message ?? responseData.detail;
    if (msg) {
      toast.warning(String(msg));
      return;
    }
  }

  // Case 5: fall back to status-specific messages
  switch (err.status) {
    case 400:
      toast.warning("Bad request. Please check your input and try again.");
      break;
    case 401:
      toast.warning("Please login.");
      window.history.pushState({}, "LoginPage", "/login");
      break;
    case 403:
      toast.warning("You don't have permission to do that.");
      break;
    case 404:
      toast.warning("The requested resource was not found.");
      break;
    case 500:
      toast.warning("Server error. Please try again later.");
      break;
    default:
      toast.warning(err.statusText || `Something went wrong (status ${err.status}).`);
  }
};