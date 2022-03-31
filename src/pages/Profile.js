//import hook react
import React, { useState, useEffect } from 'react';
import { Col, Card, Row } from "react-bootstrap";


//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';
import { API_URL } from '../utils/constants';

function Profile() {

    //state user
    const [user, setUser] = useState({});

    //define history
    const history = useHistory();

    //token
    const token = localStorage.getItem("token");

    //function "fetchData"
    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get(`${API_URL}/users/me`)
        .then((response) => {

            //set response user to state
            setUser(response.data.data);
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

    const editHanlder = async () => {

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.post(`${API_URL}/users`)
        .then(() => {

            localStorage.removeItem("token");

            history.push('/login');
        });
    };



    return (

        

        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            My Profile 
                            <hr />
                            <Row className="overflow-auto menu">
                         
                                <Col md={4} xs={6} className="mb-4">
                                
                                    <Card className="shadow">
                                    
                                        <Card.Body>
                                        <Card.Title>{user.name}</Card.Title>
                                        <Card class="Text">Status : {user.status}</Card>
                                        <Card class="Text">Email : {user.email}</Card>
                                        <Card class="Text">Gender : {user.gender}</Card>
                                        <Card class="Text">Address : {user.address}</Card>
                                    
                                        </Card.Body>
                                        <button onClick={editHanlder} className="btn btn-md btn-success">Edit</button>
                                    </Card>

                                </Col>
                             </Row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
    )
    
      
    

}

export default Profile;