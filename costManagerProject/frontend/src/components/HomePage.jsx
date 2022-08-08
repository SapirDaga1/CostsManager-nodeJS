import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Link, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';

const HomePage = () => {
    const [data, setData] = useState([]);
    const nav = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/`)
            .then(res => {
                const data = res.data;
                setData(data);
            })
            .catch(err => {
                console.log(err)})
    }, []);

    const handleChange = (event, key) => {
        const tempData = {...data};
        tempData[key] = event.target.value;
        setData(tempData);
    }

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', paddingBottom:'25px', paddingTop:'25px'}}>
                <Typography variant="h4" align="center">
                    Cost Manager App
                </Typography>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Stack  spacing={3} direction="column" divider={<Divider orientation="horizontal" flexItem />}>
                    <Stack spacing={3} direction={"column"}>
                        <Typography variant="h6" align="center">
                            Costs:
                        </Typography>
                        <Stack spacing={2} direction="row">
                            <Button onClick={() => nav("/costs")} variant="outlined">Show all costs</Button>
                            <Button onClick={() => nav("/cost/add")} variant="outlined">Add new cost</Button>
                        </Stack>
                    </Stack>
                    <Stack spacing={3} direction={"column"}>
                        <Typography variant="h6" align="center">
                            Users:
                        </Typography>
                        <Stack spacing={2} direction="row">
                            <Button onClick={() => nav("/users")} variant="outlined">Show all users</Button>
                            <Button onClick={() => nav("/user/add")} variant="outlined">Add new user</Button>
                        </Stack>
                    </Stack>
                    <Stack spacing={3} direction={"column"}>
                        <Typography variant="h6" align="center">
                            Reports:
                        </Typography>
                        <Stack spacing={2} direction="row" justifyContent={"center"}>
                            <TextField InputProps={{inputProps: {min: 1, max: 12}}} sx={{width: '80px'}} size='small' id="outlined-basic" label="mm" type={"number"} variant="outlined" onChange={(event) => handleChange(event, "month")}/>
                            <TextField InputProps={{inputProps: {min: 1900}}} sx={{width: '80px'}} size='small' id="outlined-basic" label="yyyy" type={"number"} variant="outlined" onChange={(event) => handleChange(event, "year")}/>
                            <TextField sx={{width: '200px'}} size='small' id="outlined-basic" label="client email" type={"email"} variant="outlined" onChange={(event) => handleChange(event, "id")}/>
                        </Stack>
                        <Stack justifyContent={"center"}>
                            <Button onClick={() => nav("/report", {state:{id:data.id, month:data.month, year:data.year}})} variant="outlined">Get monthly report</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </div>
        </div>
    )
};

export default HomePage;