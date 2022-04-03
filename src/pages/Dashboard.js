
import React, { useState, useEffect } from 'react';
import { Col, Card, Row,Button , Modal} from "react-bootstrap";



import { useHistory } from 'react-router';

import axios from 'axios';
import { API_URL } from '../utils/constants';

function Dashboard() {


    const [user, setUser] = useState({});
    const [tasks, setTasks] = useState([]);


    const history = useHistory();

    const token = localStorage.getItem("token");

 
    const fetchData = async () => {

        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        await axios.get('https://rogerdev-beckend-todolist.herokuapp.com/users/me')
        .then((response) => {


            setUser(response.data.data);
        })
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        await axios.get('https://rogerdev-beckend-todolist.herokuapp.com/users/me/tasks/today')
        .then((response) => {

      
            setTasks(response.data.data);
        })
    }

    useEffect(() => {

 
        // if(!token) {

 
        //     history.push('/login');
        // }
        
 
        fetchData();
    }, []);

 


   

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        

        <div className="container" style={{ marginTop: "10px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            SELAMAT DATANG <strong className="text-uppercase">{user.name}</strong>
                            <br/>
                            This is your schedule for today..
                            <hr />
                            <Row className="overflow-auto menu">
                            {tasks &&
                             tasks.map((task) => (
                            <Col md={4} xs={6} className="mb-4">
                               
                                <Card className="shadow">
                                   
                                    <Card.Body>
                                    <Card.Title>{task.title}</Card.Title>
                                    <Card class="Text">Status : {task.status}</Card>
                                    <Card class="Text">Priority : {task.priority}</Card>
                                    <Card class="Text">Time : {task.todo_date_time}</Card>
                                 
                                    <Button variant="primary" onClick={handleShow}>
                                        Launch demo modal
                                    </Button>
                                    <Modal show={show} onHide={handleClose} animation={false}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>{task.title}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>{task.note}</Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        
                                        </Modal.Footer>
                                    </Modal>
                                    </Card.Body>
                                </Card>

                            </Col>
                             ))}
                             </Row>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
    )
    
      
    

}

export default Dashboard;