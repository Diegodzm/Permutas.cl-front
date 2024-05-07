import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import Home from "./views/home";
import injectContext from './store/context';
import Register from './views/register';
import Login from './views/login';
import NavbarReact from './components/navbar';
import Categories from './views/categories';


  

function App() {


  return (
    <BrowserRouter>
     <NavbarReact></NavbarReact>
     <Routes>
       <Route path='/'  element={<Home/>}></Route>
       <Route path='/register'  element={<Register/>}></Route>
       <Route path='/login'  element={<Login/>}></Route>
       <Route path='/categories' element={<Categories></Categories>}></Route>
     </Routes>
    
    </BrowserRouter>

  );
}

export default injectContext(App);
