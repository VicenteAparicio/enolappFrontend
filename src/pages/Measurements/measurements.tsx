import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import DataService from "../../services/data.service";
import { IDataModel } from "../models/IDataModel";
import { InsertData } from "../../components/InsertData/insertData";

const baseClass = 'measurements';

export const Measurements = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<IDataModel[]>()
    const [modal, setModal] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            auth();
        }, 300);
    }, [])

    const auth = () => {
        const result = AuthService.getCurrentUser();
        if (!result) {
            navigate('/')
        }

        getData();
    }

    const getData = async () => {
        const dataReponse = await DataService.getAll();
        if (dataReponse.length >= 1) {
            setData(dataReponse);
        } else {
            setData([])
        }
    }


    const deleteData = async (dataId: number) => {
        await DataService.deleteData(dataId);
        alert('Data has been removed.')
        getData();
    }

    const logout = () => {
        AuthService.logout()
        navigate('/')
    }

    const openCloseModal = async () => {
        setModal(!modal);
    }

    return (
        <div className={baseClass}>

            <div className={baseClass + '__container'}>
                <div className="managerButtons">
                    {modal && <button className="buttonCard" onClick={() => openCloseModal()}>Cancel</button> || <button className="buttonCard" onClick={() => openCloseModal()}>Add New</button>}
                    <button className="buttonCard" onClick={() => logout()}>
                        Logout
                    </button>
                </div>

                {modal && <InsertData />}

                <div className="dataContainer">
                    <p className="titleCollection">COLLECTION</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Año</th>
                                <th>Variedad</th>
                                <th>Tipo</th>
                                <th>Color</th>
                                <th>Temperatura</th>
                                <th>Graduación</th>
                                <th>PH</th>
                                <th>Observaciones</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, index) => (
                                <tr key={index}>
                                    <td className="__dataDetailsText">{item.año}</td>
                                    <td className="__dataDetailsText">{item.variedad}</td>
                                    <td className="__dataDetailsText">{item.tipo}</td>
                                    <td className="__dataDetailsText">{item.color}</td>
                                    <td className="__dataDetailsText">{item.temperatura}º</td>
                                    <td className="__dataDetailsText">{item.graduacion}º</td>
                                    <td className="__dataDetailsText">{item.ph}º</td>
                                    <td className="__dataDetailsText">{item.observaciones}</td>

                                    <div className="buttons">
                                        <button className="buttonCard" onClick={() => deleteData(item.id)}>Delete</button>
                                    </div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}