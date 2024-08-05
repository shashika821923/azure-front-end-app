import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { msalConfig } from './configurations/authConfig';
import { EventType, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const msalInstance = await new PublicClientApplication(msalConfig);


//get initialize msalInstance
// msalInstance.initialize();

const activeAccount = msalInstance.getActiveAccount();

if (!activeAccount) {
    // Account selection
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
    }
}

//set the account
msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const authenticationResult = event.payload;
        const account = authenticationResult.account;
        msalInstance.setActiveAccount(account);
    }
});

// //enable account storage event
// msalInstance.enableAccountStorageEvents();


root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
