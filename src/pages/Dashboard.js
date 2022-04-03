
import React, { Component,useState, useEffect } from 'react';
import { Row, Container} from "react-bootstrap";



import { useHistory } from 'react-router';

import axios from 'axios';
import { API_URL } from '../utils/constants';
import SideBar from '../components/SideBar';

export default class Dashboard extends Component {
  render() {
    return (
      <div className='mt-3'>
          <Container fluid>
          <Row>
              <SideBar/>
              
          </Row>
          </Container>
      </div>
    )
  }
}


