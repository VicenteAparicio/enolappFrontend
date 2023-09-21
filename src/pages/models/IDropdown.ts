export interface IDropdown {
    value: string;
    label: string;
}

export interface IDropdownProps {
    name: string,
    options: IDropdown[];
    onSelect: (selectedValue: string) => void;
}