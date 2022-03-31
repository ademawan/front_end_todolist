import React, { useState, useEffect, useMemo, useRef } from "react";
import TaskService from "../services/TaskService";
import { useTable } from "react-table";
import { useHistory } from 'react-router';




const TaskList = (props) => {

  const [tutorials, setTutorials] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const tutorialsRef = useRef();

  tutorialsRef.current = tutorials;

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const history = useHistory();
  const token = localStorage.getItem("token");


  useEffect(() => {

    if(!token) {


        history.push('/login');
    }
    

}, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTutorials = () => {
    TaskService.getAll()
      .then((response) => {
        setTutorials(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
  };

 
  const findByTitle = () => {
    TaskService.findByTitle(searchTitle)
      .then((response) => {
        setTutorials(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openTask = (rowIndex) => {

    props.history.push("/tasks/" + rowIndex);
  };

  const deleteTask = (rowIndex) => {

    TaskService.remove(rowIndex)
    
      .then((response) => {
        alert("success delete")
        refreshList()

      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Task_uid",
        accessor: "task_uid",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Priority",
        accessor: "priority",
      },
      {
        Header: "Status",
        accessor: "status",
       
      },
      {
        Header: "Todo_date",
        accessor: "todo_date_time",
       
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
        
          const rowIdx = props.row.original.task_uid;
          return (
            <div>
              <span onClick={() => openTask(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteTask(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
              
            </div>
          );
        },
      },
    ],
    []
  );


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: tutorials,
  });

  return (
    <div className="list row mt-4" >
      <div className="col-md-8" hidden>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-4">
     
                <a className="btn btn-primary ml-2" href="/add">Add New Task</a>
             
      </div>
      <div className="col-md-12 list mt-2">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8 mb-5">
      
      </div>
    </div>
  );
};

export default TaskList;
