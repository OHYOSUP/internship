import { apiAuthJSONInstance } from "../utils/instance";

export const deleteTodo = (id) => {
  return apiAuthJSONInstance.delete(`todos/${id}`);
};
