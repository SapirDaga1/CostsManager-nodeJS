import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function CostCard({id, description, sum, date, category}) {
    return (
        <Card sx={{ minWidth: 600 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    User: {id}
                    <br/>
                    Category: {category}
                    <br/>
                    Cost sum: {sum}
                    <br/>
                    Date of purchase: {date}
                </Typography>
            </CardContent>
        </Card>
    );
}