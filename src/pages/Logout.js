import React, { useEffect } from 'react';
import { Col } from "react-bootstrap";


import { useHistory } from 'react-router';

import axios from 'axios';

function Logout() {



    const history = useHistory();

    const token = localStorage.getItem("token");

  
    useEffect(() => {

        if(!token) {

            history.push('/login');
        }
        logoutHanlder()
        
    }, []);

    const logoutHanlder = async () => {

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.post('https://rogerdev-beckend-todolist.herokuapp.com/users/logout')
        .then(() => {

            localStorage.removeItem("token");

            history.push('/login');
        });
    };
    
  
        return (
            <Col md={4} xs={6} className="mb-4">
      
    </Col>
        )
        }


export default Logout;