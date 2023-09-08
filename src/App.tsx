import './App.scss';
import { Header } from './components/Header/header';
import { LoginPage } from './pages/LoginPage/LoginPage';

function App() {
  return (
    <div className="App">
      <Header />
      <LoginPage />
    </div>
  );
}

export default App;
