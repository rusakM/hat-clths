const axios = require("axios");

exports.loginAsAdmin = async () => {
  if (global.loginToken) {
    return global.loginToken;
  }
  const url = `${process.env.API}/api/users/login`;

  try {
    const loginData = await axios({
      url,
      method: "POST",
      data: {
        email: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
      },
    });

    if (loginData) {
      return loginData.data.token;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.getToken = async () => {
  if (global.loginToken) {
    return global.loginToken;
  }
  const token = await this.loginAsAdmin();
  global.loginToken = token;

  return token;
};
