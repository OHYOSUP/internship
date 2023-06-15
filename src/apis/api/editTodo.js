import { apiAuthJSONInstance } from "../utils/instance"

export const editTodo = (id, data)=>{
  return apiAuthJSONInstance.put(`todos/${id}`, data)
}

