import React, { useEffect, useState } from 'react';
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

const Dashboard = () => {
    const { instance, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        console.log("MSAL instance:", instance);
        console.log("Accounts:", accounts);
        
        if (isAuthenticated && accounts.length > 0) {
            const accessTokenRequest = {
                scopes: ["api://your-api-client-id/user.read"],
                account: accounts[0],
            };

            instance
                .acquireTokenSilent(accessTokenRequest)
                .then((accessTokenResponse) => {
                    let accessToken = accessTokenResponse.accessToken;

                    axios.get("https://localhost:44324/WeatherForecast/Private", {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }).then(res => {
                        setForecast(res.data);
                    }).catch(err => {
                        console.error(err);
                    });
                })
                .catch((error) => {
                    if (error instanceof InteractionRequiredAuthError) {
                        instance
                            .acquireTokenPopup(accessTokenRequest)
                            .then((accessTokenResponse) => {
                                let accessToken = accessTokenResponse.accessToken;
                                console.log('Access Token (Popup):', accessToken);
                                axios.get("https://localhost:44324/WeatherForecast/Private", {
                                    headers: {
                                        Authorization: `Bearer ${accessToken}`
                                    }
                                }).then(res => {
                                    setForecast(res.data);
                                }).catch(err => {
                                    console.error(err);
                                });
                            })
                            .catch((error) => {
                                console.log('Popup Token Acquisition Error:', error);
                            });
                    } else {
                        console.log('Silent Token Acquisition Error:', error);
                    }
                });
        }
    }, [isAuthenticated, instance, accounts]);

    const handleLogout = () => {
        instance.logoutPopup()
            .then(() => {
                console.log('Logged out');
                window.location.href = '/'; 
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Welcome, {isAuthenticated && accounts[0].name}!
                </Typography>
                {forecast ? (
                    <Box>
                        {forecast.map((f, index) => (
                            <Typography key={index}>
                                {f.date}: {f.summary} - {f.temperatureC}°C
                            </Typography>
                        ))}
                    </Box>
                ) : (
                    <Typography>Loading forecast...</Typography>
                )}
                <Button
                    onClick={handleLogout}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Logout
                </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;
