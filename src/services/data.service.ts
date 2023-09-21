import axios from "axios";
import { IDataModel } from "../pages/models/IDataModel";

const API_URL = "http://localhost:3001";

export class DataService {
    async getAll(user_id: number): Promise<IDataModel[]> {
        return axios
            .get(API_URL + "/data/fromUser/" + user_id)
            .then(response => {
                return response.data.data;
            })
    }

    async deleteData(data_id: number): Promise<boolean> {
        return axios
            .delete(API_URL + "/data/" + data_id)
            .then(response => {
                return response.data.data;
            })
    }
}

export default new DataService();