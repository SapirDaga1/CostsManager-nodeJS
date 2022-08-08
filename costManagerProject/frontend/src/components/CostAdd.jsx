import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Alert, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";

const CostAdd = () => {
    const [cost, setCost] = useState({});
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleChange = (event, key) => {
        const tempCost = {...cost};
        tempCost[key] = event.target.value;
        setCost(tempCost);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({...cost});

        axios.post(`http://localhost:8000/costs/add`, {...cost})
            .then(res => {
                console.log(res);
                console.log(res.data)
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
                        Enter cost's information:
                    </Typography>
                </Stack>
            </div>
            <div style={{display:'flex', justifyContent:'center', paddingBottom:'25px', paddingTop:'25px'}}>
                <Stack spacing={3} direction={"column"}>
                    <TextField InputLabelProps={{shrink: true,}} sx={{width: '300px'}} size='small' id="outlined-basic" label="client's email address" type={"email"} variant="outlined" onChange={(event) => handleChange(event, "id")}/>
                    <TextField InputLabelProps={{shrink: true,}} sx={{width: '300px'}} size='small' id="outlined-basic" label="expense description" type={"text"} variant="outlined" onChange={(event) => handleChange(event, "description")}/>
                    <TextField InputLabelProps={{shrink: true,}} sx={{width: '300px'}} size='small' id="outlined-basic" label="cost (price)" type={"number"} variant="outlined" onChange={(event) => handleChange(event, "sum")}/>
                    <TextField InputLabelProps={{shrink: true,}} sx={{width: '300px'}} size='small' id="outlined-basic" label="expense date" type={"date"} variant="outlined" onChange={(event) => handleChange(event, "date")}/>
                    <FormControl variant="outlined">
                        <InputLabel id="category-select" shrink>
                            category
                        </InputLabel>
                        <Select input={<OutlinedInput notched label={'category'}/>} labelId="category-select" size='small' onChange={(event) => handleChange(event, "category")}>
                            <MenuItem value={'housing'}>housing</MenuItem>
                            <MenuItem value={'transportation'}>transportation</MenuItem>
                            <MenuItem value={'food'}>food</MenuItem>
                            <MenuItem value={'clothing'}>clothing</MenuItem>
                            <MenuItem value={'pharmacy'}>pharmacy</MenuItem>
                            <MenuItem value={'utilities'}>utilities</MenuItem>
                            <MenuItem value={'entertainment'}>entertainment</MenuItem>
                            <MenuItem value={'traveling'}>traveling</MenuItem>
                            <MenuItem value={'medical & healthcare'}>medical & healthcare</MenuItem>
                            <MenuItem value={'other'}>other</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={handleSubmit} size="large" variant="outlined">Add cost</Button>
                </Stack>
            </div>
            {alert ? <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '25px', paddingTop: '25px', paddingLeft: '100px', paddingRight: '100px'}}>
                <Alert severity={alertType}>{alertContent}</Alert>
            </div> : <></>}
        </div>
    )
};

export default CostAdd;