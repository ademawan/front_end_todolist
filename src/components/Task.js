import React, { useState, useEffect } from "react";
import TaskService from "../services/TaskService";
import { useHistory } from 'react-router';



const Tutorial = props => {


  const history = useHistory();
  const token = localStorage.getItem("token");


  useEffect(() => {

    if(!token) {


        history.push('/login');
    }
    

}, []);

  const initialTaskState = {
    task_uid: null,
    title: "",
    priority: "",
    status: "",
    note: "",
    todo_date_time:"",
  };
  const [currentTask, setCurrentTask] = useState(initialTaskState);
  const [message, setMessage] = useState("");

  const getTasks = id => {
    TaskService.get(id)
      .then(response => {
        setCurrentTask(response.data.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTasks(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    console.log(event)
    const { name, value } = event.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  

  const updateTask = () => {
    TaskService.update(currentTask.task_uid, currentTask)
      .then(response => {
        console.log(response.data);
        setMessage("The task was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTask = () => {
    TaskService.remove(currentTask.task_uid)
      .then(response => {
        console.log(response.data);
        props.history.push("/tasks");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTask ? (
        <div className="edit-form">
          <h4>Task</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTask.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Priority</strong>
              </label>
              <select name="priority" id="priority"  className="form-control" 
               value={currentTask.value} onChange={handleInputChange} >
                 <option value={"hight"}>Hight</option>
                 <option value={"medium"}>Medium</option>
                 <option value={"low"}>Low</option>
               </select>
            </div>
           

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              <select name="status" id="status" className="form-control" 
               value={currentTask.value} onChange={handleInputChange} >
                 <option selectedValue={"done"}>Done</option>
                 <option value={"undone"}>Undone</option>
                 <option value={"ignore"}>Ignore</option>
                 <option value={"waithing"}>Waithing</option>
               </select>
            </div>
            <div className="form-group">
              <label htmlFor="note">Note</label>
              <input
                type="text"
                className="form-control"
                id="note"
                name="note"
                value={currentTask.note}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="todo_date_time">Todo_date_time</label>
              <input
                type="datetime-local"
                className="form-control"
                id="todo_date_time"
                name="todo_date_time"
                value={currentTask.todo_date_time}
                onChange={handleInputChange} 
              />
            </div>

          </form>


          <button className="badge badge-danger mr-2" onClick={deleteTask}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTask}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
