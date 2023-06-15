import { apiAuthJSONInstance } from "../utils/instance";

export const getTodos = () => {
  return apiAuthJSONInstance.get("todos");
};
