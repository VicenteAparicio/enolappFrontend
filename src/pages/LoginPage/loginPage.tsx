import React, { useEffect, useState } from "react";
import { NavLink, } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";

const baseClass = "loginPage";

export const LoginPage = () => {

    const [user, setUser] = useState({
        email: '', password: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            auth();
        }, 300);
    }, [])

    const auth = () => {
        const result = AuthService.getCurrentUser()
        if (result) {
            navigate('/measurements')
        }
    }

    const login = () => {
        AuthService.login(
            user.email.toLocaleLowerCase(),
            user.password
        )
        navigate('/measurements')
    }

    const inputEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    return (
        <div className={baseClass}>
            <form className='container'>
                <h2 className="titleSection">LOGIN</h2>
                <label className='commonLabel'>
                    Email
                </label>
                <input
                    required={true}
                    className='commonInput'
                    type='email'
                    id="email"
                    name="email"
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
                    type='password'
                    required={true}
                    id='password'
                    name='password'
                    placeholder='password'
                    onChange={
                        (evnt: React.ChangeEvent<HTMLInputElement>) => {
                            inputEvent(evnt)
                        }
                    } />
                {/* <div className='button_Container'> */}
                <button className="button" onClick={() => login()} name='login' >Log in</button>
                <NavLink className='button' to='/signIn'>
                    Sign in
                </NavLink>
                {/* </div> */}
            </form>
        </div >
    )
}