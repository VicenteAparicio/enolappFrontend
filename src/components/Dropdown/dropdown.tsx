import React, { useState } from 'react';
import { IDropdownProps } from '../../pages/models/IDropdown';

export const Dropdown: React.FC<IDropdownProps> = ({ options, onSelect }) => {
    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedValue(value);
        onSelect(value);
    };

    return (
        <select required={true} value={selectedValue} onChange={handleSelectChange}>
            <option value="">Seleccionar opción</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};