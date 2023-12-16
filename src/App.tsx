import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/home/HomePage";
import CategoryPage from "./pages/category/CategoryPage";
import ProductPage from "./pages/product/ProductPage";
import CustomPage from "./pages/custom/CustomPage";
import ContactPage from "./pages/contact/ContactPage";
import LoginPage from "./pages/login/LoginPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} caseSensitive element={<HomePage/>}/>
          <Route path={'/contact'} element={<ContactPage/>}/>
          <Route path={'/login'} element={<LoginPage/>}/>
          <Route path={'/:link'} element={<CustomPage/>}/>
          <Route path={'/c/:link'} element={<CategoryPage/>}/>
          <Route path={'/p/:link'} element={<ProductPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;