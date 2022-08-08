import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CostCard from './CostCard'
import Typography from "@mui/material/Typography";
import {Alert} from "@mui/material";

const Costs = () => {
    const [costs, setCosts] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/costs/getall`)
            .then(res => {
                const costs = res.data;
                setCosts(costs);
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
                            Costs List:
                        </Typography>
                    </div>
                    <div>
                        {costs.map((cost, index) => (
                            <div style={{display:'flex', justifyContent:'center', paddingBottom:'25px'}}>
                            <CostCard id={cost.id} description={cost.description} sum={cost.sum}
                            date={cost.date} category={cost.category}/>
                                </div>))}
                    </div>
                </div>
            }
        </div>
    )
};

export default Costs;