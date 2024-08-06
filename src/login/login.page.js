import React from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { loginRequest } from '../configurations/authConfig';

const LoginButton = () => {
    const { instance } = useMsal();
    const navigate = useNavigate();

    const handleLogin = () => {
        instance.loginPopup({...loginRequest, prompt: 'create'})
            .then((response) => {
                localStorage.setItem('accessToken', response.accessToken);
                navigate('/dashboard');
            })
            .catch(error => console.error('Login Error:', error));
    };

    return (
        <Grid container style={{ height: '100vh' }} alignItems="center" justifyContent="center">
            <Grid item>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Welcome! Please log in to continue.
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleLogin}>
                            Login with Azure AD
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default LoginButton;
