import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import {Alert, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";

const UserAdd = () => {
    const [user, setUser] = useState({});
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleChange = (event, key) => {
        const tempUser = {...user};
        tempUser[key] = event.target.value;
        setUser(tempUser);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({...user});

        axios.post(`http://localhost:8000/users/add`, { ...user })
            .then(res => {
                console.log(res);
                console.log(res.data);
                setAlert(true);
                setAlertContent(res.statusText);
                setAlertType('success');
            })
            .catch(err => {
                console.log(err);
                setAlert(true);
                setAlertContent(err.response.data);
                setAlertType('error');
            })
    }

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', paddingBottom:'25px', paddingTop:'25px'}}>
                <Stack>
                    <Typography variant={"h5"}>
                        Enter user's information:
                    </Typography>
                </Stack>
            </div>
            <div style={{display:'flex', justifyContent:'center', paddingBottom:'25px', paddingTop:'25px'}}>
                <Stack spacing={3} direction={"column"}>
                    <TextField InputLabelProps={{shrink: true,}} sx={{width: '300px'}} size='small' id="outlined-basic" label="email address" type={"email"} variant="outlined" onChange={(event) => handleChange(event, "id")}/>
                    <TextField InputLabelProps={{shrink: true,}} sx={{width: '300px'}} size='small' id="outlined-basic" label="first name" type={"text"} variant="outlined" onChange={(event) => handleChange(event, "firstName")}/>
                    <TextField InputLabelProps={{shrink: true,}} sx={{width: '300px'}} size='small' id="outlined-basic" label="last name" type={"text"} variant="outlined" onChange={(event) => handleChange(event, "lastName")}/>
                    <TextField InputLabelProps={{shrink: true,}} sx={{width: '300px'}} size='small' id="outlined-basic" label="birthday date" type={"date"} variant="outlined" onChange={(event) => handleChange(event, "birthday")}/>
                    <FormControl variant="outlined">
                        <InputLabel id="marital-status-select" shrink>
                            marital status
                        </InputLabel>
                        <Select input={<OutlinedInput notched label={'marital status'}/>} labelId="marital-status-select" size='small' onChange={(event) => handleChange(event, "maritalStatus")}>
                            <MenuItem value={'single'}>single</MenuItem>
                            <MenuItem value={'married'}>married</MenuItem>
                            <MenuItem value={'divorced'}>divorced</MenuItem>
                            <MenuItem value={'widowed'}>widowed</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={handleSubmit} size="large" variant="outlined">Add new user</Button>
                </Stack>
            </div>
            {alert ? <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '25px', paddingTop: '25px', paddingLeft: '100px', paddingRight: '100px'}}>
                    <Alert severity={alertType}>{alertContent}</Alert>
                </div> : <></>}
        </div>
    )
};

export default UserAdd;