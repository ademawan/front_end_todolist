import React, { useEffect,useState } from "react";
import TaskService from "../services/TaskService";
import { useHistory } from 'react-router';


const AddTask = () => {
  const initialTaskState = {
    task_uid: "",
    title: "",
    priority: "hight",
    status: "",
    note: "",
    todo_date_time:"",
  };
  const [task, setTask] = useState(initialTaskState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    console.log(event)
    console.log(event.target.selectedValue)
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const history = useHistory();
  const token = localStorage.getItem("token");


  useEffect(() => {

    if(!token) {


        history.push('/login');
    }
    

}, []);

  const saveTask = () => {
    console.log(task.note)
    console.log(task.status)

    var data = {
      title: task.title,
      priority: task.priority,
      status: task.status,
      note: task.note,
      todo_date_time: task.todo_date_time,
    };
    TaskService.create(data)
      .then(response => {
        setTask({
          task_uid: response.data.data.task_uid,
          title: response.data.data.title,
          priority: response.data.data.priority,
          status: response.data.data.status,
          todo_date_time: response.data.data.todo_date_time
        });
        setSubmitted(true);
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTask = () => {
    setTask(initialTaskState);
    setSubmitted(false);
  };

  return (
    <div className="list row mt-4 justify-content-center">
    <div className="col-md-6">
    <h4 className="text-center">Create your task schedule!</h4>
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTask}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={task.title}
                onChange={handleInputChange}
              />
            </div>
          
           

            <div className="form-group">
              <label>
                <strong>Priority</strong>
              </label>
              <select name="priority" id="priority"  className="form-control" 
               value={task.value} onChange={handleInputChange} >
                 <option value={"hight"}>Hight</option>
                 <option value={"medium"}>Medium</option>
                 <option value={"low"}>Low</option>
               </select>
            </div>
            <div className="form-group">
              <label htmlFor="note">Note</label>
              <input
                type="text"
                className="form-control"
                id="note"
                name="note"
                value={task.note}
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
                value={task.todo_date_time}
                onChange={handleInputChange} 
              />
            </div>

          <button onClick={saveTask} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default AddTask;
