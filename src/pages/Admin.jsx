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

