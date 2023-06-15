import axios from "axios";
import { BASE_URL, access_token } from "../constants";

const token = localStorage.getItem(access_token);

const apiClient = () => {
  const instance = axios.create({
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    baseURL: BASE_URL,
  });
  return instance;
};

const accessTokenInterceprors = (config) => {
  const token = localStorage.getItem(access_token);
  if (token === null) {
    throw new Error("로컬스토리지에 토큰이 존재하지 않습니다");
  }
  config.headers.Authorization = `${token}`;
  return config;
};

export const apiJSONInstance = apiClient();
export const apiAuthJSONInstance = apiClient();
apiAuthJSONInstance.interceptors.request.use(accessTokenInterceprors);

// export const apiClient = axios.create({
//   headers: {
//     Authorization: `${token}`,
//     "Content-Type": "application/json",
//   },
//   baseURL: BASE_URL,
// });
