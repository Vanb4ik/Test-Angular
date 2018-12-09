
import 'promise-polyfill';

//let Promise = require('promise-polyfill');
enum RoleTypes {
    ADMIN = "admin",
    ACCOUNTING_MANAGER = "accounting-manager"
}

export enum StoreKeys {
    CRM_API_HOST_NAME = "CRM_API_HOST_NAME",
    AUTH_API_HOST_NAME = "AUTH_API_HOST_NAME",
    IDENTITY_STORE_KEY = "USER_IDENTITY",
    RAW_TOKEN = "RAW_USER_TOKEN",
    RAW_REFRESH_TOKEN = "RAW_USER_REFRESH_TOKEN",
    DATE_EXPIRE_TIME_TOKEN = "DATE_EXPIRE_TIME_TOKEN",
    DELAY_TO_SEND_REFRESH_TOKEN = "DELAY_TO_SEND_REFRESH_TOKEN",
}

interface IDecodedTokenData {
    alg: string,
    amr: Array<string>,
    aud: Array<string>,
    auth_time: number,
    client_id: string,
    expL: number,
    idp: string,
    iss: string,
    kid: string,
    nbf: number,
    role: string | string[],
    scope: Array<string>,
    sub: string,
    typ: string,
    isUserDataLoading?: boolean
}

export interface IIdentityResponse {
    access_token: string,
    expires_in: number,
    token_type: string,
    refresh_token: string
}

export class AuthCRMService {

    private static refreshToken: string;
    private static startTimer: any;
    private static authCounter: number = 0;
    private static badResponseCounter: number = 0;

    static isAuthenticated(): boolean {
        return !!AuthCRMService.getStoredRawToken();
    }

    static isRefreshToken(): boolean {
        return !!AuthCRMService.getStoreRefreshToken();
    }

    static getStoredRawToken(): string {

        return sessionStorage[StoreKeys.RAW_TOKEN] || "";
    }

    private static storeRefreshToken(refreshToken: string) {
        if (!refreshToken) {
            throw new Error("Can't store empty refresh token.");
        }
        sessionStorage[StoreKeys.RAW_REFRESH_TOKEN] = refreshToken
    }

    private static storeExpiryTimeToken(expiryTimeToken: number) {
        if (!expiryTimeToken) {
            throw new Error("Can't store empty expiry time token.");
        }
        sessionStorage[StoreKeys.DATE_EXPIRE_TIME_TOKEN] = JSON.stringify(expiryTimeToken)
    }

    private static storeDelayToSendRefreshToken(delayToSendRefreshToken: number) {
        if (!delayToSendRefreshToken) {
            throw new Error("Can't store empty delay to send refresh token.");
        }
        sessionStorage[StoreKeys.DELAY_TO_SEND_REFRESH_TOKEN] = JSON.stringify(delayToSendRefreshToken)
    }

    private static getStoreRefreshToken(): string {
        return sessionStorage[StoreKeys.RAW_REFRESH_TOKEN];
    }

    private static getStoreDateExpireTimeToken(): number {
        return parseInt(sessionStorage[StoreKeys.DATE_EXPIRE_TIME_TOKEN]);
    }

    private static getStoreDelayToSendRefreshToken(): number {
        return parseInt(sessionStorage[StoreKeys.DELAY_TO_SEND_REFRESH_TOKEN]);
    }

    private static checkExpiredTokenTime = () => {
        if( AuthCRMService.startTimer){
            clearTimeout(AuthCRMService.startTimer);
        }
        const refreshToken = AuthCRMService.getStoreRefreshToken();
        if (refreshToken ) {
            AuthCRMService.refreshToken = refreshToken;
            const delayToRefreshTokenFromServer: number = AuthCRMService.getStoreDelayToSendRefreshToken();
            AuthCRMService.startTimer = setTimeout(() => {
                return AuthCRMService.getNewToken()
            }, delayToRefreshTokenFromServer);
        } else {
            return
        }
    };

    private static getDateExpireTimeToken(tokenExpireTime: number) {
        let convertToMinutes = tokenExpireTime / 60;
        let currentDate = new Date(Date.now());
        return currentDate.setMinutes(currentDate.getMinutes() + convertToMinutes);
    }

    private static getDelayToSendRefreshToken(tokenExpireTime: number) {
        return tokenExpireTime * 1000 - 60000; // milliseconds
    }

    private static provider(identityResponse: IIdentityResponse) {
        let token: string = identityResponse.access_token;
        let refreshToken: string = identityResponse.refresh_token;


        let dateExpireTimeToken: number = AuthCRMService.getDateExpireTimeToken(identityResponse.expires_in);
        let delayToSendRefreshToken: number = AuthCRMService.getDelayToSendRefreshToken(identityResponse.expires_in);


        AuthCRMService.storeRawToken(token);
        AuthCRMService.storeRefreshToken(refreshToken);
        AuthCRMService.storeExpiryTimeToken(dateExpireTimeToken);
        AuthCRMService.storeDelayToSendRefreshToken(delayToSendRefreshToken);
    }

    private static storeRawToken(token: string) {
        if (!token) {
            throw new Error("Can't store empty token.");
        }

        sessionStorage[StoreKeys.RAW_TOKEN] = token;
    }

    private static clearAuthInfo() {
        sessionStorage.removeItem(StoreKeys.AUTH_API_HOST_NAME);
        sessionStorage.removeItem(StoreKeys.IDENTITY_STORE_KEY);
        sessionStorage.removeItem(StoreKeys.RAW_TOKEN);
        sessionStorage.removeItem(StoreKeys.RAW_REFRESH_TOKEN);
        sessionStorage.removeItem(StoreKeys.DATE_EXPIRE_TIME_TOKEN);
        sessionStorage.removeItem(StoreKeys.DELAY_TO_SEND_REFRESH_TOKEN);
        // sessionStorage.clear();

        AuthCRMService.badResponseCounter = 0;
        clearTimeout(AuthCRMService.startTimer);
    }


    static redirectByLogin() {
        const crmHost = sessionStorage[StoreKeys.CRM_API_HOST_NAME];
        this.clearAuthInfo();

        if (!crmHost) {
            return
        }

        return Promise.resolve(
            setTimeout(
                () => {
                    window.open(crmHost + "/login", "_top")
                }, 5000
            ))
    }

    static getNewToken(): Promise<any> {

        if (!sessionStorage[StoreKeys.AUTH_API_HOST_NAME]
            || !sessionStorage[StoreKeys.RAW_REFRESH_TOKEN]) {
            // app.log.error("Not have CRM permission");
            return AuthCRMService.redirectByLogin();
        }
        return new Promise((resolve) => {
            AuthCRMService.fetchToGetNewToken()
                .then(response => response.json())
                .then((responseJSON: any) => AuthCRMService.provider(responseJSON))
                .then(() => {
                    AuthCRMService.badResponseCounter = 0;

                    AuthCRMService.checkExpiredTokenTime();
                    console.log("HAVE GOT A NEW TOKEN");
                    resolve()
                })
                .catch(err => {
                    console.dir(err);
                    AuthCRMService.badResponseCounter += 1;
                    if (AuthCRMService.badResponseCounter >= 2) {
                        AuthCRMService.badResponseCounter = 0;
                        //app.log.warning("Not have CRM permission");
                        AuthCRMService.redirectByLogin();
                    }
                    else {
                        setTimeout(() => {
                            return this.getNewToken()
                        }, 15000)
                    }

                })
        })
    }

    private static fetchToGetNewToken() {

        const url = `${sessionStorage[StoreKeys.AUTH_API_HOST_NAME]}/connect/token`;
        const bodyData = {
            grant_type: "refresh_token",
            client_id: "apms_client",
            client_secret: "secret",
            refresh_token: AuthCRMService.getStoreRefreshToken()
        };

        let data = "";
        const encode = (data) => {
            return encodeURIComponent(data).replace(/%20/g, '+');
        };

        for (let key in bodyData) {
            if (typeof bodyData[key] == 'string') {
                data += (data ? '&' : '') + encode(key) + '=' + encode(bodyData[key]);
            }
        }

        const requestParams: RequestInit = {
            method: "POST",
            body: data,

            headers: new Headers({"Content-Type": "application/x-www-form-urlencoded"})
        };
        return fetch(url, requestParams)
    }
}

