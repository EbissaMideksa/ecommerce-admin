
/* import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import remove_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const backUrl = 'https://ecommerce-backend-production1.up.railway.app';
  const [allProducts, setAllProducts] = useState([]);

  // ✅ Fetch all products
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

  // ✅ Remove product
  const removeProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`${backUrl}/deleteproduct/${productId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        setAllProducts((prev) => prev.filter(product => product.id !== productId));
      } else {
        console.error("Error removing product:", result.message);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='list-product'>
      <h1>All Product Lists</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproducts-allproducts">
        <hr />
        {allProducts.length > 0 ? (
          allProducts.map((product) => (
            <div key={product.id} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt={product.name} className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                src={remove_icon}
                onClick={() => removeProduct(product.id)}
                alt="Remove product"
                className="productlist-remove-icon"
              />
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
 */


/*
import React from 'react';
import './ListProduct.css';
import remove_icon from '../../assets/cross_icon.png';

const ListProduct = ({ products, onRemove }) => {
  const backUrl = 'https://ecommerce-backend-production1.up.railway.app';

  const removeProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`${backUrl}/deleteproduct/${productId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        onRemove(productId); // ✅ update parent state directly
      } else {
        console.error("Error removing product:", result.message);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className="list-product">
      <h1>All Product Lists</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproducts-allproducts">
        <hr />
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt={product.name} className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                src={remove_icon}
                onClick={() => removeProduct(product.id)}
                alt="Remove product"
                className="productlist-remove-icon"
              />
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
*/

/*
import React from 'react';
import './ListProduct.css';
import remove_icon from '../../assets/cross_icon.png';

const ListProduct = ({ backUrl, allProducts, setAllProducts }) => {
  const removeProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`${backUrl}/deleteproduct/${productId}`, { method: 'DELETE' });
      const result = await response.json();

      if (result.success) {
        setAllProducts(allProducts.filter((p) => p.id !== productId)); // ✅ Update shared state
      } else {
        console.error("Error removing product:", result.message);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className='list-product'>
      <h1>All Product Lists</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproducts-allproducts">
        <hr />
        {allProducts.length > 0 ? (
          allProducts.map((product) => (
            <div key={product.id} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt={product.name} className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                src={remove_icon}
                onClick={() => removeProduct(product.id)}
                alt="Remove"
                className="productlist-remove-icon"
              />
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
*/

import React from 'react';
import './ListProduct.css';
import remove_icon from '../../assets/cross_icon.png';

const ListProduct = ({ backUrl, allProducts, setAllProducts }) => {
  // ✅ Remove product
  const removeProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`${backUrl}/deleteproduct/${productId}`, { method: 'DELETE' });
      const result = await response.json();

      if (result.success) {
        setAllProducts(allProducts.filter((p) => p.id !== productId));
      } else {
        console.error("Error removing product:", result.message);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  // ✅ Fix image path for old & new products
  const getImageUrl = (image) => {
    if (!image) return "/fallback.png"; // handle empty image
    if (image.startsWith("http")) return image; // Cloudinary or full URL
    return `${backUrl}/${image}`; // fallback to backend path
  };

  return (
    <div className='list-product'>
      <h1>All Product Lists</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproducts-allproducts">
        <hr />
        {allProducts.length > 0 ? (
          allProducts.map((product) => (
            <div key={product.id} className="listproduct-format-main listproduct-format">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="listproduct-product-icon"
                onError={(e) => { e.target.src = "/fallback.png"; }} // fallback if broken
              />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                src={remove_icon}
                onClick={() => removeProduct(product.id)}
                alt="Remove"
                className="productlist-remove-icon"
              />
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
