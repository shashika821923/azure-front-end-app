import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "e78850a5-c013-4ff1-940e-b65d1bdc6aee",
        authority: "https://c8180359-9370-4696-b5bf-4356f7100cc8.ciamlogin.com/c8180359-9370-4696-b5bf-4356f7100cc8/v2.0",
        instance: "https://c8180359-9370-4696-b5bf-4356f7100cc8.ciamlogin.com/c8180359-9370-4696-b5bf-4356f7100cc8/v2.0",
        tenantId: 'c8180359-9370-4696-b5bf-4356f7100cc8',
        callbackPath: "/"
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

export const protectedResources = {
    toDoListAPI: {
        endpoint: 'https://localhost:44351/api/todolist',
        scopes: ["api://3e6db6a6-2f58-4043-b7d2-46972c7eaaca/User.Read"],
    },
};

export const loginRequest = {
    scopes: []
};

export const apiRequest = {
    scopes: [...protectedResources.toDoListAPI.scopes]
};