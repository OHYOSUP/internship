import axios from "axios";
import { BASE_URL, access_token } from "../constants";

const token = localStorage.getItem(access_token)

export const apiClientWithoutJson = axios.create({
  headers:{
    Authorization: `${token}`,    
  },
  baseURL: BASE_URL
})

export const apiClient = axios.create({
  headers:{
    Authorization: `${token}`,
    'Content-Type': 'application/json'
  },
  baseURL: BASE_URL
})