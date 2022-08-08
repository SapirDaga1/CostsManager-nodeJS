import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {useLocation} from 'react-router-dom';
import {Alert} from "@mui/material";

const Report = () => {
    const [report, setReport] = useState([]);
    const [costs, setCosts] = useState([]);
    const location = useLocation();
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/reports/get/`, {
            params: {
                id: location.state.id,
                month: location.state.month,
                year: location.state.year
            }
        })
            .then(res => {
                const report = res.data[0];
                setReport(report);
                console.log(res);
                setCosts(report.listOfCosts)
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
                    <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '25px', paddingTop: '25px'}}>
                        <Stack spacing={3} direction={"column"}>
                            <Typography variant={"h4"}>
                                Report for {report.month}/{report.year}
                            </Typography>
                            <Typography variant={"h5"}>
                                For user: {report.id}
                            </Typography>
                        </Stack>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '25px', paddingTop: '25px'}}>
                        <Typography variant="h6">
                            Costs list:
                        </Typography>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '25px', paddingTop: '25px', paddingLeft: '300px', paddingRight: '300px'}}>
                        <Typography variant="body1">
                            <ul>
                                {costs.map((cost, index) => (
                                    <li>
                                        {cost}
                                    </li>))}
                            </ul>
                        </Typography>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '25px', paddingTop: '25px'}}>
                        <Typography variant="body1">
                            Total sum: {report.totalSum}
                        </Typography>
                    </div>
                </div>
            }
        </div>
    )
};

export default Report;