/* import React,{useState,useEffect} from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
  const backUrl='https://ecommerce-backend-producing.up.railway.app'

  const [image, setImage] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    old_price: '',
    new_price: '',
    category: 'women',
  }); 

  const handleInputChange = (e) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

 
useEffect(() => {
  return () => {
    if (image) {
      URL.revokeObjectURL(image);
    }
  };
}, [image]);

const Add_product = async () => {
  let responseData;
  let product = productDetails;

  let formData = new FormData();
  formData.append('product', image);

  await fetch(`${backUrl}/upload`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      responseData = data;
      //console.log("Response Data:", responseData);
      //console.log('product added');
    })
    .catch(error => {
      console.error('Error:', error);
    });

  if (responseData && responseData.success) {
    product.image = responseData.imageUrl;

    // ✅ NOW SEND TO BACKEND TO SAVE TO DB
    await fetch(`${backUrl}/addproduct`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Save to DB response:", data);
        if (data.success) {
          alert("Product saved to database!");
        } else {
          alert("Failed to save product to database.");
        }
      })
      .catch(err => {
        console.error("Error saving product:", err);
      });
  } else {
    console.error("Upload failed:", responseData);
  }
};

  return (
    <div className='add-product'>
      <div className="add-product-item-field">
        <p>Product Title</p>
        <input value={productDetails.name} type="text" name="name" onChange={handleInputChange} />
      </div>
      <div className="addproduct-price">
          <div className="add-product-item-field">
          <p>Product Price</p>
          <input value={productDetails.old_price} type="text" name='old_price' placeholder='Product Price' onChange={handleInputChange} />
        </div>
        <div className="add-product-item-field">
          <p>Offer Price</p>
          <input value={productDetails.new_price} type="text" name='new_price' placeholder='Offer Price' onChange={handleInputChange} />
        </div>
      </div>
      <div className="add-product-item-field">
        <p>Category</p>
        <select className='add-product-item-select' name="category" value={productDetails.category} onChange={handleInputChange}>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="add-product-item-field">
        <label htmlFor="file-input">
           <img onChange={handleImageChange}
             src={image? URL.createObjectURL(image)
              : upload_area} className='addproduct-thumbnail-img'
               alt="Upload Area" /> *
        
        </label>
        <input type="file" id="file-input" hidden onChange={handleImageChange} />
      </div>
      <button onClick={()=>Add_product()} className='add-product-button'>Add Product</button>
    </div>
  )
}

export default AddProduct
 */

import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const backUrl = 'https://ecommerce-backend-production1.up.railway.app';
  const [image, setImage] = useState(null);

  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    old_price: '',
    new_price: '',
    category: 'women',
  });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const Add_product = async () => {
    if (!productDetails.name || !productDetails.old_price || !productDetails.new_price || !image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    try {
      // ✅ Upload image first
      const formData = new FormData();
      formData.append('product', image);

      const uploadResponse = await fetch(`${backUrl}/upload`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      if (!uploadData.success || !uploadData.imageUrl) {
        alert("Image upload failed.");
        return;
      }

      // ✅ Prepare product object
      const product = {
        ...productDetails,
        image: uploadData.imageUrl,
      };

      // ✅ Save product to DB
      const response = await fetch(`${backUrl}/addproduct`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      if (data.success) {
        alert("Product added successfully!");
        // ✅ Reset form
        setProductDetails({ name: '', image: '', old_price: '', new_price: '', category: 'women' });
        setImage(null);
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className='add-product'>
      <div className="add-product-item-field">
        <p>Product Title</p>
        <input value={productDetails.name} type="text" name="name" onChange={handleInputChange} />
      </div>

      <div className="addproduct-price">
        <div className="add-product-item-field">
          <p>Product Price</p>
          <input value={productDetails.old_price} type="number" name='old_price' placeholder='Product Price' onChange={handleInputChange} />
        </div>
        <div className="add-product-item-field">
          <p>Offer Price</p>
          <input value={productDetails.new_price} type="number" name='new_price' placeholder='Offer Price' onChange={handleInputChange} />
        </div>
      </div>

      <div className="add-product-item-field">
        <p>Category</p>
        <select className='add-product-item-select' name="category" value={productDetails.category} onChange={handleInputChange}>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      <div className="add-product-item-field">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className='addproduct-thumbnail-img'
            alt="Upload Area"
          />
        </label>
        <input type="file" id="file-input" hidden onChange={handleImageChange} />
      </div>

      <button onClick={Add_product} className='add-product-button'>Add Product</button>
    </div>
  );
};

export default AddProduct;
