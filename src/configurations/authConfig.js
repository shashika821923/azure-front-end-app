import { LogLevel } from "@azure/msal-browser";

export const ClientId = 'xxxxx-xxxxx-xxxx-xxxxx'; // react application app id in azure 
export const TenantName = 'xxxxxxxxxxxxx'; // tenant name in azure 
export const TenantId = 'xxxxx-xxxxx-xxxx-xxxxx'; // tenant id in azure
export const BackEndApiApplicationId = 'xxxxx-xxxxx-xxxx-xxxxx'; // web application app id in azure
export const BackEndEndpoint = 'https://localhost:44324';

export const msalConfig = {
    auth: {
        clientId: ClientId,
        authority: `https://${TenantName}.ciamlogin.com/`,
        instance: `https://${TenantName}.ciamlogin.com/`,
        tenantId: '',
        callbackPath: "/",
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
        allowNativeBroker: false,
    },
};

export const loginRequest = {
    scopes: [`api://${BackEndApiApplicationId}/.default`]
};
