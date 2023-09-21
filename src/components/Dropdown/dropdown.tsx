import React, { useState } from 'react';
import { IDropdown, IDropdownProps } from '../../pages/models/IDropdown';

export const Dropdown: React.FC<IDropdownProps> = ({ options, onSelect }) => {
    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedValue(value);
        onSelect(value);
    };

    return (
        <select value={selectedValue} onChange={handleSelectChange}>
            <option value="">Seleccionar opción</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};