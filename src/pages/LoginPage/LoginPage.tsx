import React, { useState } from "react";

const baseClass = "loginPage";

export const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const inputEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch(event.target?.id) {
            case 'userName':
                setUserName(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
            default:
                break;
        }
    }

    return (
            <div className={baseClass}>
                <div className={baseClass + 'container'}>
                    <label className={baseClass + 'label'}>
                        User name
                    </label>
                    <input 
                        type='text'
                        id="userName"
                        name="Name"
                        placeholder="user"
                        onChange={ 
                            (evnt: React.ChangeEvent<HTMLInputElement>) => {
                                 inputEvent(evnt)
                            }
                        }/>
                    <label className={baseClass + 'label'}>
                        Password
                    </label>
                    <input 
                        type='text'
                        id="password"
                        name="Password"
                        placeholder="password"
                        onChange={ 
                            (evnt: React.ChangeEvent<HTMLInputElement>) => {
                                 inputEvent(evnt)
                            }
                        }/>
                </div>

                <p>User name is: {userName}</p>
                <p>Password is: {password}</p>
            </div>
    )
}