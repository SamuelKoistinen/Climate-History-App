import './App.css';
import { Route, Routes} from 'react-router-dom';
import Login from './components/login';
import CreateUser from './components/createUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/user/create" element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default App;
