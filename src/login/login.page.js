import React from 'react';
import { useMsal } from '@azure/msal-react';
import axios from 'axios';
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from '../configurations/authConfig';

const LoginButton = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginPopup(loginRequest)
            .then((response) => {
                localStorage.setItem('accessToken', response.accessToken);
                fetchData();
            })
            .catch(error => console.error('Login Error:', error));
    };

    const fetchData = () => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            console.error('No access token available');
            return;
        }

        instance.acquireTokenSilent(loginRequest)
            .then(response => {
                axios.get("https://localhost:44324/WeatherForecast/Private", {
                    headers: {
                        Authorization: `Bearer ${response.accessToken}`
                    }
                }).then(res => {
                    console.log('API Data:', res.data);
                }).catch(err => {
                    console.error('API Request Error:', err);
                });
            })
            .catch(error => {
                if (error instanceof InteractionRequiredAuthError) {
                    instance.acquireTokenPopup(loginRequest)
                        .then(response => {
                            axios.get("https://localhost:44324/WeatherForecast/Private", {
                                headers: {
                                    Authorization: `Bearer ${response.accessToken}`
                                }
                            }).then(res => {
                                console.log('API Data (Popup):', res.data);
                            }).catch(err => {
                                console.error('API Request Error (Popup):', err);
                            });
                        })
                        .catch(error => console.error('Popup Token Acquisition Error:', error));
                } else {
                    console.error('Silent Token Acquisition Error:', error);
                }
            });
    };

    return (
        <button onClick={handleLogin}>
            Login with Azure AD
        </button>
    );
};

export default LoginButton;
