
import React, { useState } from 'react';
import  { API_URL } from "../utils/constants";


import { useHistory } from 'react-router';


import axios from 'axios';

function Register() {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("male");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");


    const [validation, setValidation] = useState([]);


    const history = useHistory();


    const registerHandler = async (e) => {
        e.preventDefault();
        

        const formData = new FormData();

    
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('gender', gender);
        formData.append('address', address);


        await axios.post(`${API_URL}/users/register`, formData)


        .then(function (response) {
          
            history.push('/login');
          })

        .catch((error) => {
            setValidation(error.response.data);
        })
    };

    return (
        <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4 className="fw-bold text-center">REGISTRATION</h4>
                            <hr/>
                            <form onSubmit={registerHandler}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">FULLNAME</label>
                                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Fullname"/>
                                        </div>
                                        {
                                        validation.name && (
                                            <div className="alert alert-danger">
                                                {validation.name[0]}
                                            </div>
                                        )
                                        }
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">EMAIL</label>
                                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com"/>
                                        </div>
                                        {
                                            validation.email && (
                                                <div className="alert alert-danger">
                                                    {validation.email[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">GENDER</label>
                                                <select className="form-control"  
                                                onChange={e => {
                                                    console.log(e.target.value)
                                                   setGender(e.target.value)
                                                }} >
                                                <option value={"male"}>Male</option>
                                                <option value={"female"}>Female</option>
                                            </select>
                                        </div>
                                        
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">ADDRESS</label>
                                            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address"/>
                                        </div>
                                        {
                                            validation.address && (
                                                <div className="alert alert-danger">
                                                    {validation.address[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">PASSWORD</label>
                                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                                        </div>
                                        {
                                            validation.password && (
                                                <div className="alert alert-danger">
                                                    {validation.password[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                
                                
                                <button type="submit" className="btn btn-primary">REGISTER</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;