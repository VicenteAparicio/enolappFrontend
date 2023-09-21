import React, { useState } from "react";
import { IDropdown } from "../../pages/models/IDropdown";
import { Dropdown } from "../Dropdown/dropdown";
import { IData } from "../../pages/models/IDataModel";
import dataService from "../../services/data.service";
import { NavLink } from "react-router-dom";
import AuthService from "../../services/auth.service";

const baseClass = "insertData";

export const InsertData: React.FC = () => {
    const [insertObject, setInsertObject] = useState<IData>({
        userId: 0,
        año: 0,
        variedad: '',
        tipo: '',
        color: '',
        temperatura: 0,
        graduacion: 0,
        ph: 0,
        observaciones: ''
    });

    // const [errors, setErrors] = useState({ eAño: '', eVariedad: '', eTipo: '', eColor: '', eTemperatura: '', eGraduacion: '', ePh: '', eObservaciones: '' });

    const handleInsertObject = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInsertObject({
            ...insertObject,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleVariedad = (selectedValue: string) => {
        setInsertObject({
            ...insertObject, variedad: selectedValue
        })
    };

    const handleTipo = (selectedValue: string) => {
        setInsertObject({
            ...insertObject, tipo: selectedValue
        })
    };

    const handleColor = (selectedValue: string) => {
        setInsertObject({
            ...insertObject, color: selectedValue
        })
    };


    const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInsertObject({
            ...insertObject,
            observaciones: event.currentTarget.value
        })
        addData()
    }

    const addData = () => {
        const currentUser = AuthService.getCurrentUser();

        const body: IData = {
            ...insertObject,
            userId: currentUser?.data.id!
        }

        console.log("Esto : ", body)
        const addDataResponse = dataService.insert(body);

        // dataService.getAll();

        // console.log(addDataResponse)
    }

    const variedades: IDropdown[] = [
        { value: 'Abocado', label: 'Abocado' },
        { value: 'Semi seco', label: 'Semi seco' },
        { value: 'Semi dulce', label: 'Semi dulce' },
        { value: 'Dulce', label: 'Dulce' },
    ];

    const tipos: IDropdown[] = [
        { value: 'Joven', label: 'Joven' },
        { value: 'Crianza', label: 'Crianza' },
        { value: 'Reserva', label: 'Reserva' },
        { value: 'Gran Reserva', label: 'Gran Reserva' },
    ];

    const colores: IDropdown[] = [
        { value: 'Tinto', label: 'Tinto' },
        { value: 'Blanco', label: 'Blanco' },
        { value: 'Rosado', label: 'Rosado' },
    ];

    return (
        <div className={baseClass}>
            <form className="container">
                <label className="commonLabel">Año</label>
                <input className="commonInput" type="text" name='año' onChange={handleInsertObject} placeholder='Año' />
                {/* <div className="validateError">{errors.eAño}</div> */}
                <label className="commonLabel">Variedad</label>
                <Dropdown name='variedad' options={variedades} onSelect={handleVariedad} />
                <label className="commonLabel">Tipo</label>
                <Dropdown name='tipo' options={tipos} onSelect={handleTipo} />
                <label className="commonLabel">Color</label>
                <Dropdown name='color' options={colores} onSelect={handleColor} />
                <label className="commonLabel">Temperatura</label>
                <input className="commonInput" type="text" name='temperatura' onChange={handleInsertObject} placeholder='Temperatura' />
                {/* <div className="validateError">{errors.eTemperatura}</div> */}
                <input className="commonInput" type="text" name='graduacion' onChange={handleInsertObject} placeholder='Graduacion' />
                {/* <div className="validateError">{errors.eGraduacion}</div> */}
                <input className="commonInput" type="text" name='ph' onChange={handleInsertObject} placeholder='Ph' />
                {/* <div className="validateError">{errors.ePh}</div> */}
                <textarea className="textAreaInput" name='observaciones' onChange={handleTextArea} placeholder='Observaciones' />
                {/* <div className="validateError">{errors.ePh}</div> */}
                <button className="buttonCard" onClick={() => addData()}>
                    Add
                </button>
            </form>
        </div>
    )
}