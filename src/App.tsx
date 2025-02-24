import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/home/HomePage";
import CategoryPage from "./pages/category/CategoryPage";
import ProductPage from "./pages/product/ProductPage";
import CustomPage from "./pages/custom/CustomPage";
import ContactPage from "./pages/contact/ContactPage";
import LoginPage from "./pages/login/LoginPage";
import AccountDataPage from "./pages/account/account-data/AccountDataPage";
import WishlistPage from "./pages/account/wishlist/WishlistPage";
import CartPage from "./pages/cart/CartPage";
import RegisterPage from "./pages/login/RegisterPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} caseSensitive element={<HomePage/>}/>
          <Route path={'/contact'} element={<ContactPage/>}/>
          <Route path={'/login'} element={<LoginPage/>}/>
          <Route path={'/register'} element={<RegisterPage/>}/>
          <Route path={'/cart'} element={<CartPage/>}/>
          <Route path={'/checkout'} element={<CheckoutPage/>}/>
          <Route path={'/account'} element={<AccountDataPage/>}/>
          <Route path={'/account/addresses'} element={<AccountDataPage/>}/>
          <Route path={'/account/orders'} element={<AccountDataPage/>}/>
          <Route path={'/account/wishlist'} element={<WishlistPage/>}/>
          <Route path={'/:link'} element={<CustomPage/>}/>
          <Route path={'/c/:link'} element={<CategoryPage/>}/>
          <Route path={'/p/:link'} element={<ProductPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;