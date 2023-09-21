import { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import DataService from "../../services/data.service";
import { IDataModel } from "../models/IDataModel";
import { ILoggerResponse } from "../models/ILoggerResponse";

const baseClass = 'measurements';

export const Measurements = () => {
    const navigate = useNavigate();
    const [userLog, setUserLog] = useState<ILoggerResponse>()
    const [data, setData] = useState<IDataModel[]>()

    useEffect(() => {
        setTimeout(() => {
            auth();
        }, 300);
    }, [])

    const auth = () => {
        const result = AuthService.getCurrentUser();

        if (!result) {
            navigate('/')
        } else {
            setUserLog(result)
        }
    }

    const getData = async () => {
        const dataReponse = await DataService.getAll(userLog?.data.id!)
        setData(dataReponse);
    }


    const deleteData = async (data_id: number) => {
        const result = await DataService.deleteData(data_id);
        if (result) {
            alert("Data has been removed.")
        }
        getData();
    }

    const logout = () => {
        AuthService.logout()
        navigate('/')
    }

    const updateData = async () => { }

    return (
        <div className={baseClass}>

            <div className={baseClass + '__container'}>
                <button className="buttonCard" onClick={() => logout()}>
                    Logout
                </button>
                <button className="buttonCard" onClick={() => getData()}>
                    Refresh Data
                </button>


                <div className="dataContainer">
                    {data?.map((item, index) => (
                        <div className="dataCard" key={index}>
                            <div className="__dataDetails">
                                <p className="__dataDetailsText">{item.año}</p>
                                <p className="__dataDetailsText">{item.variedad}</p>
                                <p className="__dataDetailsText">{item.tipo}</p>
                                <p className="__dataDetailsText">{item.color}</p>
                                <p className="__dataDetailsText">{item.temperatura}</p>
                                <p className="__dataDetailsText">{item.graduacion}</p>
                                <p className="__dataDetailsText">{item.observaciones}</p>

                            </div>
                            <div className="buttons">
                                <button className="buttonCard" onClick={() => updateData()}>Update</button>
                                <button className="buttonCard" onClick={() => deleteData(item.id)}>Delete</button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}