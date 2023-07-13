import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import './App.css';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/login" Component={Login}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
