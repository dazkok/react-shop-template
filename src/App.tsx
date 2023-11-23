import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/home/HomePage";
import CategoryPage from "./pages/category/CategoryPage";
import ProductPage from "./pages/product/ProductPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} caseSensitive element={<HomePage/>}/>
          <Route path={'/c/:link'} element={<CategoryPage/>}/>
          <Route path={'/p/:link'} element={<ProductPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;