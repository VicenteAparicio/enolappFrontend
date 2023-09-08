import { NavigateBar } from "../NavigateBar/NavigateBar";

const baseClass = "header";

export const Header = () => {

    return (
        <header className={baseClass}>
            <div className={baseClass + '__logo'}>
                LOGO
            </div>
            <NavigateBar/>
        </header>
    )
}