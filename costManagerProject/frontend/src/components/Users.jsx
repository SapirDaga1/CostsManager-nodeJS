import React, {useEffect, useState} from 'react';
import axios from 'axios';
import UserCard from './UserCard'
import Typography from "@mui/material/Typography";
import {Alert} from "@mui/material";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/users/getall`)
            .then(res => {
                const users = res.data;
                setUsers(users);
            })
            .catch(err => {
                console.log(err)
                setAlert(true);
                setAlertContent(err.response.data);
            })
    }, []);

    return (
        <div>
            {alert ? <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '25px', paddingTop: '25px', paddingLeft: '100px', paddingRight: '100px'}}>
                    <Alert severity='error'>{alertContent}</Alert>
                </div> :
                <div>
                    <div style={{display:'flex', justifyContent:'center', paddingBottom:'25px', paddingTop:'25px'}}>
                        <Typography variant={"h4"}>
                            Users List:
                        </Typography>
                    </div>
                    <div>
                        {users.map((user, index) => (
                            <div style={{display:'flex', justifyContent:'center', paddingBottom:'25px'}}>
                                <UserCard id={user.id} firstName={user.firstName} lastName={user.lastName}
                                          birthday={user.birthday} maritalStatus={user.maritalStatus}/>
                            </div>))}
                    </div>
                </div>
            }
        </div>
    )
};

export default Users;