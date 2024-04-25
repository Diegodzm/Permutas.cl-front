import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import Home from "./views/home";
import injectContext from './store/context';
import Register from './views/register';
import Navbar from './components/navbar';
import Login from './views/login';

function App() {
  return (
    <BrowserRouter>
     <Navbar></Navbar>
     <Routes>
       <Route path='/'  element={<Home/>}></Route>
       <Route path='/register'  element={<Register/>}></Route>
       <Route path='/login'  element={<Login/>}></Route>
     </Routes>
    
    </BrowserRouter>

  );
}

export default injectContext(App);
