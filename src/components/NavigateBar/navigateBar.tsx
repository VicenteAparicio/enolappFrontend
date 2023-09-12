import { NavLink } from "react-router-dom";

const baseClass = "navigateBar";

export const NavigateBar = () => {
    return (
        <div className={baseClass}>
            <ul className={baseClass + '__navigateList'}>

                <NavLink className='links' to='/'>
                    Login
                </NavLink>


                <NavLink className='links' to='/home'>
                    Home
                </NavLink>



            </ul>
        </div>
    )
}