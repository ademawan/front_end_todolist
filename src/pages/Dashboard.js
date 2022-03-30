//import hook react
import React, { useState, useEffect } from 'react';
import { Col, Card, Row,Button , Modal} from "react-bootstrap";


//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';

function Dashboard() {

    //state user
    const [user, setUser] = useState({});
    const [tasks, setTasks] = useState([]);

    //define history
    const history = useHistory();

    //token
    const token = localStorage.getItem("token");

    //function "fetchData"
    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get('http://localhost:8000/users/me')
        .then((response) => {

            //set response user to state
            setUser(response.data.data);
        })
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get('http://localhost:8000/users/me/tasks')
        .then((response) => {

            //set response user to state
            setTasks(response.data.data);
        })
    }
    //hook useEffect
    useEffect(() => {

        //check token empty
        if(!token) {

            //redirect login page
            history.push('/login');
        }
        
        //call function "fetchData"
        fetchData();
    }, []);

    //function logout
    const logoutHanlder = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch Rest API
        await axios.post('http://localhost:8000/users/logout')
        .then(() => {

            //remove token from localStorage
            localStorage.removeItem("token");

            //redirect halaman login
            history.push('/login');
        });
    };


   

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        

        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            SELAMAT DATANG <strong className="text-uppercase">{user.name}</strong>
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