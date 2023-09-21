import './App.scss';
import { LoginPage } from './pages/LoginPage/loginPage';
import { Route, Routes } from 'react-router-dom';
import { SignInPage } from './pages/SignIn/signInPage';
import { Measurements } from './pages/Measurements/measurements';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/measurements' element={<Measurements />} />
        <Route path='/signIn' element={<SignInPage />} />
      </Routes>
    </div>
  );
}

export default App;
