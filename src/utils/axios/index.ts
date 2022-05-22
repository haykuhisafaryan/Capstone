import Axios from "axios";
import { getRefreshToken, getToken, setRefreshToken, setToken } from "../";

const axios = Axios.create();

axios.defaults.baseURL =
  "https://capstone-library-system-backend-4shozg2vyq-uc.a.run.app";

axios.interceptors.request.use(
  function (config) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers["Authorization"] = `Bearer ${getToken()}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    return new Promise((resolve, reject) => {
      const refreshToken = getRefreshToken();

      if (error?.response?.data?.statusCode === 401 && refreshToken) {
        axios
          .post("/user/tokens", {
            refreshToken,
          })
          .then((data) => {
            setToken(data.data.response.token);
            setRefreshToken(data.data.response.refreshToken);

            axios(error.request).then(resolve).catch(reject);
          })
          .catch((error) => {
            setToken(null);
            setRefreshToken(null);
            reject(error);
          });
      } else {
        reject(error);
      }
    });
  }
);
export default axios;
