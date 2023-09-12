import { useState } from "react";
import { Form } from "react-router-dom";

const baseClass = 'signInPage';

export const SignInPage = () => {

    const [credentials, setCredentials] = useState({ name: '', lastName: '', email: '', password: '', birthDate: '', country: '', city: '', cp: '', isAdmin: 'false', isPremium: 'false', isActive: 'true' });
    const [errors, setErrors] = useState({ eName: '', eLastName: '', eEmail: '', ePassword: '', eBirthDate: '', eCountry: '', eCity: '', eCP: '', eCardNumber: '', eExpiration: '', eCVV: '', eAdress: '' });

    const updateCredentials = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }


    return (
        <div className={baseClass}>
            <div>
                <p>REGISTRO</p>
            </div>
        </div>
    )
}