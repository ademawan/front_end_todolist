import http from "../http-common";
const getAll = () => {
  return http.get("/users/me/tasks");
};
const get = id => {
  return http.get(`/users/me/tasks/${id}`);
};
const create = data => {
  return http.post("/users/me/tasks/", data);
};
const update = (id, data) => {
  return http.put(`/users/me/tasks/${id}`, data);
};
const remove = id => {
  return http.delete(`/users/me/tasks/${id}`);
};


const TaskService = {
  getAll,
  get,
  create,
  update,
  remove,
};
export default TaskService;