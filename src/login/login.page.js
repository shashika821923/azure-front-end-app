import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { BackEndEndpoint, loginRequest } from '../configurations/authConfig';
import axios from 'axios';

const LoginButton = () => {
    const { instance } = useMsal();
    const [forcastWithoutAuth, setForcastWithoutAuth] = useState([]);
    const [forcastWithAuth, setForcastWithAuth] = useState(null);
    const [showError, setShowError] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const navigate = useNavigate();

    const handleLogin = () => {
        instance.loginPopup({ ...loginRequest})
            .then((response) => {
                localStorage.setItem('accessToken', response.accessToken);
                setAccessToken(response.accessToken);
            })
            .catch(error => console.error('Login Error:', error));
    };

    const fetchForcastWithoutAuth = () => {
        axios.get(`${BackEndEndpoint}/WeatherForecast`).then(res => {
            setForcastWithoutAuth(res.data);
        }).catch(err => {
            console.error(err);
        });
    }

    const fetchForcastWithAuth = () => {
        axios.get(`${BackEndEndpoint}/WeatherForecast/Private`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(res => {
            setForcastWithAuth(res.data);
            setShowError(false);
        }).catch(err => {
            setShowError(true);
            console.error(err);
        });
    }


    return (
        <Grid container style={{ height: '100vh' }} alignItems="center" justifyContent="center">
            <Grid item>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Welcome! Please log in to continue.
                        </Typography>
                        {!!accessToken && (
                            <Typography variant="h6" gutterBottom>
                                Access Token:
                                <br />
                                <Typography
                                    component="pre"
                                    style={{
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        maxWidth: '100%',
                                        overflowWrap: 'break-word'
                                    }}
                                >
                                    {accessToken}
                                </Typography>
                            </Typography>
                        )}
                        <Button variant="contained" color="primary" onClick={handleLogin}>
                            Login with Azure AD
                        </Button>
                    </CardContent>

                </Card>
                <Card sx={{ marginTop: 5 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Fetch forcast data (without authentication)
                        </Typography>
                        <Box>
                            {forcastWithoutAuth.length > 0 && forcastWithoutAuth.map((f, index) => (
                                <Typography key={index}>
                                    {f.date}: {f.summary} - {f.temperatureC}°C
                                </Typography>
                            ))}
                        </Box>
                        <Button variant="contained" color="primary" onClick={fetchForcastWithoutAuth}>
                            Get Forcast
                        </Button>
                    </CardContent>
                </Card>
                <Card sx={{ marginTop: 5 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Fetch forcast data (with authentication)
                        </Typography>
                        <Box>
                            {forcastWithAuth!= null  && forcastWithAuth.forecasts.map((f, index) => (
                                <Typography key={index}>
                                    {f.date}: {f.summary} - {f.temperatureC}°C
                                </Typography>
                            ))}
                        </Box>
                        {forcastWithAuth!= null && <Typography variant="h6" sx={{ color: 'blue' }} gutterBottom>
                           Your username:  {forcastWithAuth.username}
                        </Typography>}
                        {showError && <Typography variant="h6" sx={{ color: 'red' }} gutterBottom>
                            401 - You are not authorized
                        </Typography>}
                        <Button variant="contained" color="primary" onClick={fetchForcastWithAuth}>
                            Get Forcast
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default LoginButton;
