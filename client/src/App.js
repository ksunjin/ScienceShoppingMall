import React, { Suspense } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage.js';
import LoginPage from './components/views/LoginPage/LoginPage.js';
import RegisterPage from './components/views/RegisterPage/RegisterPage.js';
import UploadProductPage from "./components/views/UploadProductPage/UploadProductPage.js";
import NavBar from "./components/views/NavBar/NavBar";
import Auth from './hoc/auth'
import ProductDetailPage from "./components/views/ProductDetailPage/ProductDetailPage.js";
import CartDetail from './components/views/CartDetail/CartDetail.js';


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Router>
        <NavBar />
        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>

          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/Login" component={Auth(LoginPage, false)} />
            <Route exact path="/Register" component={Auth(RegisterPage, false)} />
            <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
            <Route exact path="/product/:productId" component={Auth(ProductDetailPage, null)} />
            <Route exact path="/user/cart" component={Auth(CartDetail, true)} />
          </Switch>
        </div>

      </Router>


    </Suspense>
  );
}


export default App;
