import React, { useEffect, useState } from "react";
import { IDropdown } from "../../pages/models/IDropdown";
import { Dropdown } from "../Dropdown/dropdown";
import { IData } from "../../pages/models/IDataModel";
import dataService from "../../services/data.service";
import AuthService from "../../services/auth.service";

const baseClass = "insertData";

export const InsertData: React.FC = () => {

    const [validate, setValidate] = useState<boolean>(false);
    const [buttonClassValidation, setButtonClassValidation] = useState('')
    const [errors, setErrors] = useState({ eAño: '', eTemperatura: '', eGraduacion: '', ePh: '', eObservaciones: '' });
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

    const ageRG = new RegExp(/^(\d{4})$/);
    const tempRG = new RegExp(/^(\d{1}|\d{2})$/);
    const textRG = new RegExp(/^(?!\s*$).+/g);

    useEffect(() => {
        if (errors.eAño === ''
            && errors.eTemperatura === ''
            && errors.eGraduacion === ''
            && errors.ePh === '') {
            setValidate(true);
            setButtonClassValidation('');
        } else {
            setButtonClassValidation('buttonClassValidation');
        }
    }, [errors]);

    const handleInsertObject = (event: React.ChangeEvent<HTMLInputElement>) => {
        const arg = event.currentTarget.name;
        const value = event.currentTarget.value;
        switch (arg) {
            case 'año':
                if (!ageRG.test(value)) {
                    setErrors({ ...errors, eAño: "Input can't be empty and should be a number of 4 digits." });
                } else {
                    setErrors({ ...errors, eAño: '' });
                }
                break
            case 'temperatura':
                if (!tempRG.test(value)) {
                    setErrors({ ...errors, eTemperatura: "Input can't be empty and should be a number of 1 or 2 digits." });
                } else {
                    setErrors({ ...errors, eTemperatura: '' });
                }
                break
            case 'graduacion':
                if (!tempRG.test(value)) {
                    setErrors({ ...errors, eGraduacion: "Input can't be empty and should be a number of 1 or 2 digits." });
                } else {
                    setErrors({ ...errors, eGraduacion: '' });
                }
                break
            case 'ph':
                if (!tempRG.test(value)) {
                    setErrors({ ...errors, ePh: "Input can't be empty and should be a number of 1 or 2 digits." });
                } else {
                    setErrors({ ...errors, ePh: '' });
                }
                break
            default:
                break
        }
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
    }

    const addData = () => {
        if (!validate) {
            const currentUser = AuthService.getCurrentUser();

            const body: IData = {
                ...insertObject,
                userId: currentUser?.data.id!
            }
            dataService.insert(body);

            dataService.getAll();
        }
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
                <input required={true} className="commonInput" type="text" name='año' onChange={handleInsertObject} placeholder='Año' />
                <div className="validateError">{errors.eAño}</div>
                <label className="commonLabel">Variedad</label>
                <Dropdown name='variedad' options={variedades} onSelect={handleVariedad} />
                <label className="commonLabel">Tipo</label>
                <Dropdown name='tipo' options={tipos} onSelect={handleTipo} />
                <label className="commonLabel">Color</label>
                <Dropdown name='color' options={colores} onSelect={handleColor} />
                <label className="commonLabel">Temperatura</label>
                <input required={true} className="commonInput" type="text" name='temperatura' onChange={handleInsertObject} placeholder='Temperatura' />
                <div className="validateError">{errors.eTemperatura}</div>
                <input required={true} className="commonInput" type="text" name='graduacion' onChange={handleInsertObject} placeholder='Graduacion' />
                <div className="validateError">{errors.eGraduacion}</div>
                <input required={true} className="commonInput" type="text" name='ph' onChange={handleInsertObject} placeholder='Ph' />
                <div className="validateError">{errors.ePh}</div>
                <textarea required={true} className="textAreaInput" name='observaciones' onChange={handleTextArea} placeholder='Observaciones' />
                <div className="validateError">{errors.ePh}</div>
                <button className={`button ${buttonClassValidation}`} onClick={() => addData()}>
                    Add
                </button>
            </form>
        </div>
    )
}