import React, { useEffect, useState } from "react";
import { NavLink, } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useSelector } from "react-redux";
import { IUserState } from "../models/IUserState";
import { useDispatch } from "react-redux";

const baseClass = "loginPage";

export const LoginPage = () => {

    const dispatch = useDispatch();

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

    const login = async () => {
        const userLoggerResponse = AuthService.login(
            user.email.toLocaleLowerCase(),
            user.password
        )
        dispatch({ type: "ADD_USER", payload: userLoggerResponse });

        navigate('/measurements')
    }

    // const AuthUserLogger = () => {
    //     const result = useSelector<IUserState, IUserState["data"]>((state) => state.data);

    //     if (result) {
    //         navigate('/measurements')
    //     }
    // }

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
                    className='commonInput'
                    type='text'
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
                    id='password'
                    name='password'
                    placeholder='password'
                    onChange={
                        (evnt: React.ChangeEvent<HTMLInputElement>) => {
                            inputEvent(evnt)
                        }
                    } />
                <div className='button_Container'>
                    <button className="button" onClick={() => login()} name='Sign in' >Log in</button>
                    <NavLink className='button' to='/signIn'>
                        Sign in
                    </NavLink>
                </div>
            </form>
        </div >
    )
}