import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const baseClass = "loginPage";

export const LoginPage = () => {
    const [user, setUser] = useState({
        userName: '',
        password: ''
    });

    const inputEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    const sendLogin = () => {

    }

    return (
        <div className={baseClass}>
            <form className={baseClass + '__container'}>
                <label className='commonLabel'>
                    User name
                </label>
                <input
                    className='commonInput'
                    type='text'
                    id="userName"
                    name="userName"
                    placeholder="user"
                    onChange={
                        (evnt: React.ChangeEvent<HTMLInputElement>) => {
                            inputEvent(evnt)
                        }
                    } />
                <label className='commonLabel'>
                    Password
                </label>
                <input
                    className='commonInput'
                    type='text'
                    id="password"
                    name="password"
                    placeholder="password"
                    onChange={
                        (evnt: React.ChangeEvent<HTMLInputElement>) => {
                            inputEvent(evnt)
                        }
                    } />
                <div className="button_Container">
                    <button className="button" onSubmit={sendLogin} name="Sign in" >Log in</button>
                    <NavLink className='button' to='/signIn'>
                        Sign in
                    </NavLink>
                </div>
            </form>


        </div >
    )
}