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
import Categories from './views/categories';
import OfertaPermuta from './components/oferta_permuta'; // Importar el componente OfertaPermuta

function App() {
  let accessToken = localStorage.getItem("accessToken")
  let auth = false
  if (accessToken === null || accessToken === "") {
    auth = false
  } else {
    auth = true
  }

  return (
    <BrowserRouter>
      {auth ? <NavbarLogged /> : <NavbarReact />}
      <Routes>
        <Route element={<PrivateRoutes />}>

        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/product_upload' element={<ProductUploadView />} />
        <Route path='/productreview' element={<ProductReview />} />
        <Route path='/oferta_permuta' element={<OfertaPermuta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default injectContext(App);
