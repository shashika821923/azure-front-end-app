import { LogLevel } from "@azure/msal-browser";

//shashika
// export const ClientId = 'xxxxx-xxxxx-xxxx-xxxxx'; // react application app id in azure 
// export const TenantName = 'xxxxxxxxxxxxx'; // tenant name in azure 
// export const TenantId = 'xxxxx-xxxxx-xxxx-xxxxx'; // tenant id in azure
// export const BackEndApiApplicationId = 'xxxxx-xxxxx-xxxx-xxxxx'; // web application app id in azure


export const ClientId = 'e78850a5-c013-4ff1-940e-b65d1bdc6aee'; // react application app id in azure 
export const TenantName = 'c8180359-9370-4696-b5bf-4356f7100cc8'; // tenant name in azure 
export const TenantId = 'c8180359-9370-4696-b5bf-4356f7100cc8'; // tenant id in azure
export const BackEndApiApplicationId = '3e6db6a6-2f58-4043-b7d2-46972c7eaaca'; // web application app id in azure
export const BackEndEndpoint = 'https://localhost:44324';

export const msalConfig = {
    auth: {
        clientId: ClientId,
        //authority: `https://login.microsoftonline.com/common`,
        authority: `https://c8180359-9370-4696-b5bf-4356f7100cc8.ciamlogin.com/c8180359-9370-4696-b5bf-4356f7100cc8/v2.0`,
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
