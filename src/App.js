import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./views/home";
import injectContext from './store/context';
import Register from './views/register';
import Login from './views/login';
import ProductUploadView from './views/product_upload';
import NavbarReact from './components/navbar';
import PrivateRoutes from './components/privateroutes';
import NavbarLogged from './components/navbar_logged';
import ListadeIntercambios from './views/listadeintercambios'; 
import CatAbarr from './views/cat_abarr';
import CatDeportes from './views/cat_deportes';
import CatElectro from './views/cat_electro';
import CatOtros from './views/cat_otros';
import CatTecno from './views/cat_tecno';
import CatVest from './views/cat_vestimenta';
import Allproducts from './views/allproducts';
import UserProducts from './views/userproducts';
import { Context } from "./store/context";
import { useContext } from "react"


function App() {
  
 
  const {store,actions}= useContext(Context)
   
  return (
    <BrowserRouter>
      {store.validation ? <NavbarLogged/>:<NavbarReact/>}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/product_upload' element={<ProductUploadView />}></Route>
        </Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/categorias/electro' element={<CatElectro/>}></Route>
        <Route path='/categorias/abarrotes' element={<CatAbarr/>}></Route>
        <Route path='/categorias/otros' element={<CatOtros/>}></Route>
        <Route path='/categorias/deportes' element={<CatDeportes/>}></Route>
        <Route path='/categorias/tecnologia' element={<CatTecno/>}></Route>
        <Route path='/categorias/vestimenta' element={<CatVest/>}></Route>
        <Route path='/listadeintercambios' element={<ListadeIntercambios/>}></Route>
        <Route path='/products' element={<Allproducts />}></Route>
        <Route path='/products/user' element={<UserProducts />}></Route>
        
      </Routes>
    </BrowserRouter>

  );
}

export default injectContext(App);
