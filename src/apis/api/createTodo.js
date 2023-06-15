import { apiAuthJSONInstance } from "../utils/instance"

export const createTodos = (data)=>{
  return apiAuthJSONInstance.post('todos', data)
}

