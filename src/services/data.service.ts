import axios from "axios";
import { IData, IDataModel } from "../pages/models/IDataModel";
import AuthService from "./auth.service";

const API_URL = 'https://enolapp-backend-c29bc0412d42.herokuapp.com';

export class DataService {
    async getAll(): Promise<IDataModel[]> {
        const user = AuthService.getCurrentUser();
        return await axios
            .get(API_URL + "/data/fromUser/" + user?.data.id, {
                headers: {
                    'Authorization': `Bearer ${user?.data.token}`
                }
            })
            .then(response => response.data.data)
    }

    async deleteData(data_id: number): Promise<boolean> {
        const user = AuthService.getCurrentUser();
        return await axios
            .delete(API_URL + "/data/" + data_id, {
                headers: {
                    'Authorization': `Bearer ${user?.data.token}`
                }
            })
            .then(response => response.data.data)
    }

    async insert(body: IData) {
        const user = AuthService.getCurrentUser();
        return await axios
            .post(API_URL + "/data", body, {
                headers: {
                    'Authorization': `Bearer ${user?.data.token}`
                }
            })
            .then(response => response.data)
    }
}

export default new DataService();