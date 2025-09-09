/*
 import React from 'react'
import './Admin.css'
import SideBar from '../components/sideBar/SideBar'
import {Route,Routes} from 'react-router-dom'
import AddProduct from '../components/addProduct/AddProduct'
import ListProduct from '../components/listProduct/ListProduct'

const Admin = () => {
  return (
    <div className='admin'>
      <SideBar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
      </Routes>
    </div>
  )
}

export default Admin

 */

/* import React, { useState, useEffect } from 'react';
import './Admin.css';
import SideBar from '../components/sideBar/SideBar';
import { Route, Routes } from 'react-router-dom';
import AddProduct from '../components/addProduct/AddProduct';
import ListProduct from '../components/listProduct/ListProduct';

const Admin = () => {
  const backUrl = 'https://ecommerce-backend-production1.up.railway.app';
  const [products, setProducts] = useState([]);

  // ✅ Fetch products once on load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${backUrl}/all_products`);
        const data = await response.json();
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Add new product directly into state
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // ✅ Remove product directly from state
  const handleRemoveProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="admin">
      <SideBar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct onAdd={handleAddProduct} />} />
        <Route path="/listproduct" element={<ListProduct products={products} onRemove={handleRemoveProduct} />} />
      </Routes>
    </div>
  );
};

export default Admin;

 */

/* import React, { useState, useEffect } from 'react';

import './Admin.css';
import SideBar from '../components/sideBar/SideBar';
import { Route, Routes } from 'react-router-dom';
import AddProduct from '../components/addProduct/AddProduct';
import ListProduct from '../components/listProduct/ListProduct';

const Admin = () => {
  const backUrl = 'https://ecommerce-backend-production1.up.railway.app';
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products once
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${backUrl}/all_products`);
      const data = await response.json();
      if (data.success && Array.isArray(data.products)) {
        setAllProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='admin'>
      <SideBar />
      <Routes>
        <Route 
          path="/addproduct" 
          element={<AddProduct backUrl={backUrl} allProducts={allProducts} setAllProducts={setAllProducts} />} 
        />
        <Route 
          path="/listproduct" 
          element={<ListProduct backUrl={backUrl} allProducts={allProducts} setAllProducts={setAllProducts} />} 
        />
      </Routes>
    </div>
  );
};

export default Admin;
 */

import React, { useState, useEffect } from 'react';
import './Admin.css';
import SideBar from '../components/sideBar/SideBar';
import { Route, Routes } from 'react-router-dom';
import AddProduct from '../components/addProduct/AddProduct';
import ListProduct from '../components/listProduct/ListProduct';

const Admin = () => {
  const backUrl = 'https://ecommerce-backend-production1.up.railway.app';
  const [allProducts, setAllProducts] = useState([]);

  // ✅ Fetch all products once
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${backUrl}/all_products`);
      const data = await response.json();
      if (data.success && Array.isArray(data.products)) {
        setAllProducts(data.products);
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin">
      <SideBar />
      <Routes>
        <Route
          path="/addProduct"
          element={
            <AddProduct 
              backUrl={backUrl}
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              fetchProducts={fetchProducts} // ✅ child can trigger refresh
            />
          }
        />
        <Route
          path="/listProduct"
          element={
            <ListProduct
              backUrl={backUrl}
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              fetchProducts={fetchProducts} // ✅ consistency
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Admin;
