import axios from "axios";
import { BASE_URL, access_token } from "../constants";

const token = localStorage.getItem(access_token);

const axiosApi = () => {
  const instance = axios.create({ baseURL: BASE_URL });
  return instance;
};

const axiosJSONApi = () => {
  const instance = axios.create({
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    baseURL: BASE_URL,
  });
  return instance;
};

const accessTokenInjector = (config) => {
const token = localStorage.getItem(access_token);

  if (token === null) {
    throw new Error("no access token in localStorage");
  }
  config.headers.Authorization = `${token}`;
  return config;
};

export const apiInstance = axiosApi();

export const apiJSONInstance = axiosJSONApi();

export const apiAuthInstance = axiosApi();
apiAuthInstance.interceptors.request.use(accessTokenInjector);

export const apiAuthJSONInstance = axiosJSONApi();
apiAuthJSONInstance.interceptors.request.use(accessTokenInjector);

// export const apiClient = axios.create({
//   headers: {  
//     Authorization: `${token}`,
//     "Content-Type": "application/json",
//   },
//   baseURL: BASE_URL,
// });
