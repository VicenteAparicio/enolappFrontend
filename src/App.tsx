import './App.scss';
import { Header } from './components/Header/header';
import { Home } from './pages/Home/home';
import { LoginPage } from './pages/LoginPage/loginPage';
import { Route, Routes } from 'react-router-dom';
import { SignInPage } from './pages/SignIn/signInPage';

export const App = () => {
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signIn' element={<SignInPage />} />
      </Routes>
    </div>
  );
}

export default App;
