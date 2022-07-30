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

export const sendData = async (url, data, method, isFormData = false) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const requestOptions = {
      method,
      url,
      data,
    };
    if (isFormData) {
      requestOptions.headers = headers;
    }
    const response = await axios(requestOptions);

    return response.data.data.data;
  } catch (error) {
    throw error;
  }
};

export function AppError(message, code) {
  this.message = message;
  this.code = code;
}
