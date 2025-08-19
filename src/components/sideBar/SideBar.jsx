import React from 'react'
import './SideBar.css'
import add_product_item from '../../assets/Product_Cart.svg'
import list_product from '../../assets/Product_list_icon.svg'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='sidebar'>
      <Link to="/addProduct">
        <div className="sidebar-item">
          <img src={add_product_item} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to="/listProduct">
        <div className="sidebar-item">
          <img src={list_product} alt="" />
          <p>List Product</p>
        </div>
      </Link>
    </div>
  )
}

export default SideBar
