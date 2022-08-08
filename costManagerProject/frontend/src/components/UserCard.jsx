import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function UserCard({id, firstName, lastName, birthday, maritalStatus}) {
    return (
        <Card sx={{ minWidth: 600 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {firstName} {lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    User email: {id}
                    <br/>
                    Birthday date: {birthday}
                    <br/>
                    Marital status: {maritalStatus}
                </Typography>
            </CardContent>
        </Card>
    );
}