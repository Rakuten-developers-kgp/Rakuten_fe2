/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import '../main.css';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const history = useHistory();

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

    return (
        <div className="container mt-5">
            <h3 className='dash-head'>Welcome Back: {name}</h3>
            {/* <button onClick={getUsers} className="button is-info">Get Users</button>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}

                </tbody>
            </table> */}


            <div className='main'>
                <div className='col1'>
                    <div className='c1r1'>
                        <center>
                            <label className='head2'>Must</label>
                        </center>

                        <div className='must-div'>
                            <div className='must1'>
                                <input className='must-key' type="text" id="lname" placeholder='Parameter' name="lname" />
                            </div>
                            <div className='must2'>
                                <input className='must-key' type="text" id="lname" placeholder='Value' name="lname" />
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className='c1r1'>
                        <center>
                            <label className='head2'>Should</label>
                        </center>
                        <div className='must-div'>
                            <div className='must1'>
                                <input className='must-key' type="text" id="lname" placeholder='Parameter' name="lname" />
                            </div>
                            <div className='must2'>
                                <input className='must-key' type="text" id="lname" placeholder='Value' name="lname" />
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className='c1r1'>
                        <center>
                            <label className='head2'>Not</label>
                        </center>
                        <div className='must-div'>
                            <div className='must1'>
                                <input className='must-key' type="text" id="lname" placeholder='Parameter' name="lname" />
                            </div>
                            <div className='must2'>
                                <input className='must-key' type="text" id="lname" placeholder='Value' name="lname" />
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className='c1r1'>
                        <center>
                            <label className='head2'>Filter</label>
                        </center>
                        <div className='must-div'>
                            <div className='must1'>
                                <input className='must-key' type="text" id="lname" placeholder='Parameter' name="lname" />
                            </div>
                            <div className='must2'>
                                <input className='must-key' type="text" id="lname" placeholder='Value' name="lname" />
                            </div>
                        </div>
                    </div>
                    <br />
                    <center>
                        <button class="button button5">Submit</button>
                    </center>

                </div>
                <div className='col2'>
                    <label for="lname">Results:</label>
                    <br />
                    <div className='c2r3'>
                        <i> Results will be displayed here</i>
                    </div>



                </div>
            </div>



        </div>
    )
}

export default Dashboard
