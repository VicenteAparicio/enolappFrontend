import axios from "axios";
import { ILoggerResponse } from "../pages/models/ILoggerResponse";
// const API_URL = 'https://enolapp-backend-c29bc0412d42.herokuapp.com';
const API_URL = 'http://localhost:3001';

export class AuthService {

    async login(email: string, password: string): Promise<ILoggerResponse> {
        const body = {
            email: email,
            password: password
        }

        return await axios
            .post(API_URL + "/login", body)
            .then(response => {
                if (response.data.data.token) {
                    const userLoggerResponse = JSON.stringify(response.data);
                    sessionStorage.setItem("user", userLoggerResponse);
                }

                return response.data;
            })
            .catch(Error);
    }

    logout() {
        sessionStorage.removeItem("user");
    }

    async register(nickname: string, email: string, password: string): Promise<boolean> {

        const body = {
            nickname: nickname.toLocaleLowerCase(),
            email: email,
            password: password
        }
        return await axios
            .post(API_URL + "/user", body)
            .then(response => {
                if (response.data.data) {
                    return response.data.data;
                }
            })
            .catch(Error);
    }

    getCurrentUser() {
        const userStr = sessionStorage.getItem("user");
        if (userStr) {
            const localUser: ILoggerResponse = JSON.parse(userStr);

            return localUser;
        }
        return null;
    }
}

export default new AuthService();