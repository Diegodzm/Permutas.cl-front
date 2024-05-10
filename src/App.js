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
import ProductReview from './views/productreview';
import ListadeIntercambios from './views/listadeintercambios'; 

function App() {
  let accessToken = localStorage.getItem("accessToken")
  let auth = false
  if (accessToken === null || accessToken === "") {
    auth = false

  }
  else {
    auth = true
  }


  return (
    <BrowserRouter>
      {auth? <NavbarLogged/>:<NavbarReact/>}
      <Routes>
        <Route element={<PrivateRoutes />}>
      
        </Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/productreview' element={<ProductReview />}></Route>
        <Route path='/product_upload' element={<ProductUploadView />}></Route>
        <Route path='/listadeintercambios' element={<ListadeIntercambios/>}></Route>

      </Routes>
    </BrowserRouter>

  );
}

export default injectContext(App);
