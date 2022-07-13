import axios from "axios";

export const getData = async (url) => {
  try {
    const response = await axios({
      method: "GET",
      url,
    });

    return response.data.data.data;
  } catch (error) {
    throw error;
  }
};

export function AppError(message, code) {
  this.message = message;
  this.code = code;
}
