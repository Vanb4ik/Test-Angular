//let Promise = require('promise-polyfill');
import {ConstantsUrl} from "../../Helper/ConstantsUrl";

enum RoleTypes {
  ADMIN = "admin",
  ACCOUNTING_MANAGER = "accounting-manager"
}

export enum StoreKeys {


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

export class AuthService {

  private static refreshToken: string;
  private static startTimer: any;
  private static authCounter: number = 0;
  private static badResponseCounter: number = 0;

  static isAuthenticated(): boolean {
    return !!AuthService.getStoredRawToken();
  }

  static isRefreshToken(): boolean {
    return !!AuthService.getStoreRefreshToken();
  }

  static getStoredRawToken(): string {

    return localStorage[StoreKeys.RAW_TOKEN] || "";
  }

  private static storeRefreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new Error("Can't store empty refresh token.");
    }
    localStorage[StoreKeys.RAW_REFRESH_TOKEN] = refreshToken
  }

  private static storeExpiryTimeToken(expiryTimeToken: number) {
    if (!expiryTimeToken) {
      throw new Error("Can't store empty expiry time token.");
    }
    localStorage[StoreKeys.DATE_EXPIRE_TIME_TOKEN] = JSON.stringify(expiryTimeToken)
  }

  private static storeDelayToSendRefreshToken(delayToSendRefreshToken: number) {
    if (!delayToSendRefreshToken) {
      throw new Error("Can't store empty delay to send refresh token.");
    }
    localStorage[StoreKeys.DELAY_TO_SEND_REFRESH_TOKEN] = JSON.stringify(delayToSendRefreshToken)
  }

  private static getStoreRefreshToken(): string {
    return localStorage[StoreKeys.RAW_REFRESH_TOKEN];
  }


  private static getStoreDelayToSendRefreshToken(): number {
    return parseInt(localStorage[StoreKeys.DELAY_TO_SEND_REFRESH_TOKEN]);
  }

  private static checkExpiredTokenTime = () => {
    if (AuthService.startTimer) {
      clearTimeout(AuthService.startTimer);
    }
    const refreshToken = AuthService.getStoreRefreshToken();
    if (refreshToken) {
      AuthService.refreshToken = refreshToken;
      const delayToRefreshTokenFromServer: number = AuthService.getStoreDelayToSendRefreshToken();
      AuthService.startTimer = setTimeout(() => {
        return AuthService.getNewToken()
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

  static provider(identityResponse: IIdentityResponse) {
    let token: string = identityResponse.access_token;
    let refreshToken: string = identityResponse.refresh_token;
    let dateExpireTimeToken: number = AuthService.getDateExpireTimeToken(identityResponse.expires_in);
    let delayToSendRefreshToken: number = AuthService.getDelayToSendRefreshToken(identityResponse.expires_in);
    AuthService.storeRawToken(token);
    AuthService.storeRefreshToken(refreshToken);
    AuthService.storeExpiryTimeToken(dateExpireTimeToken);
    AuthService.storeDelayToSendRefreshToken(delayToSendRefreshToken);

    AuthService.checkExpiredTokenTime();
  }

  private static storeRawToken(token: string) {
    if (!token) {
      throw new Error("Can't store empty token.");
    }

    localStorage[StoreKeys.RAW_TOKEN] = token;
  }

  private static clearAuthInfo() {

    localStorage.removeItem(StoreKeys.IDENTITY_STORE_KEY);
    localStorage.removeItem(StoreKeys.RAW_TOKEN);
    localStorage.removeItem(StoreKeys.RAW_REFRESH_TOKEN);
    localStorage.removeItem(StoreKeys.DATE_EXPIRE_TIME_TOKEN);
    localStorage.removeItem(StoreKeys.DELAY_TO_SEND_REFRESH_TOKEN);

    AuthService.badResponseCounter = 0;
    clearTimeout(AuthService.startTimer);
  }

  static redirectByLogin() {

    this.clearAuthInfo();

    return Promise.resolve(
      setTimeout(
        () => {
          window.location.replace("/"+ConstantsUrl.LOGIN)
        }, 5000
      ))
  }

  static getNewToken(): Promise<any> {

    if (!localStorage[StoreKeys.RAW_REFRESH_TOKEN]) {
      // app.log.error("Not have CRM permission");
      return AuthService.redirectByLogin();
    }
    return new Promise((resolve) => {
      AuthService.fetchToGetNewToken()
        .then(response => response.json())
        .then((responseJSON: any) => AuthService.provider(responseJSON))
        .then(() => {
          AuthService.badResponseCounter = 0;
          console.log("HAVE GOT A NEW TOKEN");
          resolve()
        })
        .catch(err => {
          console.dir(err);
          AuthService.badResponseCounter += 1;
          if (AuthService.badResponseCounter >= 2) {
            AuthService.badResponseCounter = 0;
            //app.log.warning("Not have CRM permission");
            AuthService.redirectByLogin();
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

    const url = `/connect/token`;
    const bodyData = {
      grant_type: "refresh_token",
      client_id: "test_api_client",
      client_secret: "secret",
      refresh_token: AuthService.getStoreRefreshToken()
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

