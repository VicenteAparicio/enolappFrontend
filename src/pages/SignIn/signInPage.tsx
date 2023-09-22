import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { validationPassword } from "../utils/validationPassword";

const baseClass = 'signInPage';

export const SignInPage = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ nickname: '', email: '', password: '' });
    const [errors, setErrors] = useState({ eNickname: '', eEmail: '', ePassword: [''] });
    const [validate, setValidate] = useState<boolean>(false);
    const [buttonClassValidation, setButtonClassValidation] = useState('')

    useEffect(() => {
        if (errors.eNickname === '' && errors.eEmail === '' && errors.ePassword.length === 1) {
            setValidate(true);
            setButtonClassValidation('');
        } else {
            setButtonClassValidation('buttonClassValidation');
        }
    }, [errors]);

    const updateCredentials = (event: React.ChangeEvent<HTMLInputElement>) => {

        let arg = event.currentTarget.name;
        switch (arg) {
            case 'nickname':
                if ((credentials.nickname.length < 2) || (! /^[a-z ,.'-]+$/i.test(credentials.nickname)) || (credentials.nickname.length > 20)) {
                    if (arg === 'nickname') {
                        setErrors({ ...errors, eNickname: 'Not a validate name' });
                    }
                } else {
                    setErrors({ ...errors, eNickname: '' });
                }
                break;
            case 'email':
                if (! /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(credentials.email)) {
                    setErrors({ ...errors, eEmail: 'Not a validate email' });
                } else {
                    setErrors({ ...errors, eEmail: '' });
                }
                break;
            case 'password':
                const passwordErrors = validationPassword(event.currentTarget.value);
                setErrors({ ...errors, ePassword: passwordErrors });
                break;

        }
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    const register = async () => {
        if (!validate) {
            const result = await AuthService.register(
                credentials.nickname,
                credentials.email,
                credentials.password
            );
            if (result) {
                navigate('/')
            }
        }
    }

    return (
        <div className={baseClass}>
            <div className='container'>
                <div className='registerContainer'>
                    <h2 className="titleSection">REGISTER</h2>


                    <label className="commonLabel">Nickname</label>
                    <input className="commonInput" type="text" name="nickname" onChange={updateCredentials} placeholder="Nickname" />
                    <div className="validateError">{errors.eNickname}</div>
                    <label className="commonLabel">EMAIL</label>
                    <input className="commonInput" type="email" name="email" onChange={updateCredentials} placeholder="Email" />
                    <div className="validateError">{errors.eEmail}</div>
                    <label className="commonLabel">PASSWORD</label>
                    <input className="commonInput" type="password" name="password" onChange={updateCredentials} placeholder="Password" />
                    <div className="passwordValidation">
                        {errors.ePassword.map((err, index) => (
                            <div key={index} className="validateError">{err}</div>
                        ))}
                    </div>
                </div>
                <div className="button_Container">
                    <button className={`button ${buttonClassValidation}`} onClick={() => register()} name="Sign up" >Register</button>
                    <NavLink className='button' to='/'>
                        Log in
                    </NavLink>
                </div>
            </div>
        </div>
    )
}