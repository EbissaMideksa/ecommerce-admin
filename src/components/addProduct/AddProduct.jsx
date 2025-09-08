/*
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


 */

/* import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = ({ onAdd }) => {
  const backUrl = 'https://ecommerce-backend-production1.up.railway.app';
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    old_price: '',
    new_price: '',
    category: 'women',
  });

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleInputChange = (e) => {
    setProductDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const Add_product = async () => {
    if (!productDetails.name || !productDetails.old_price || !productDetails.new_price || !image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    setLoading(true);
    try {
      // ✅ Upload image
      const formData = new FormData();
      formData.append('product', image);

      const uploadResponse = await fetch(`${backUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      if (!uploadData.success || !uploadData.imageUrl) {
        alert("Image upload failed.");
        setLoading(false);
        return;
      }

      // ✅ Prepare product object
      const product = {
        ...productDetails,
        image: uploadData.imageUrl,
      };

      // ✅ Save product
      const response = await fetch(`${backUrl}/addproduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      if (data.success) {
        alert("Product added successfully!");
        onAdd({ ...product, id: data.productId }); // ✅ Add to parent state

        // Reset form
        setProductDetails({ name: '', image: '', old_price: '', new_price: '', category: 'women' });
        setImage(null);
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-item-field">
        <p>Product Title</p>
        <input value={productDetails.name} type="text" name="name" onChange={handleInputChange} />
      </div>

      <div className="addproduct-price">
        <div className="add-product-item-field">
          <p>Product Price</p>
          <input value={productDetails.old_price} type="number" name="old_price" onChange={handleInputChange} />
        </div>
        <div className="add-product-item-field">
          <p>Offer Price</p>
          <input value={productDetails.new_price} type="number" name="new_price" onChange={handleInputChange} />
        </div>
      </div>

      <div className="add-product-item-field">
        <p>Category</p>
        <select name="category" value={productDetails.category} onChange={handleInputChange}>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      <div className="add-product-item-field">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} className="addproduct-thumbnail-img" alt="Upload Area" />
        </label>
        <input type="file" id="file-input" hidden onChange={handleImageChange} />
      </div>

      <button onClick={Add_product} className="add-product-button" disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </button>
    </div>
  );
};

export default AddProduct;
 */


/*
import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = ({ backUrl, allProducts, setAllProducts }) => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    old_price: '',
    new_price: '',
    category: 'women',
  });

  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleInputChange = (e) =>
    setProductDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  const Add_product = async () => {
    if (!productDetails.name || !productDetails.old_price || !productDetails.new_price || !image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    try {
      // Upload image
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

      // Save product
      const newProduct = { ...productDetails, image: uploadData.imageUrl };
      const response = await fetch(`${backUrl}/addproduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();

      if (data.success) {
        alert("Product added successfully!");
        setAllProducts([...allProducts, { ...newProduct, id: data.product.id }]); // ✅ Update shared state
        setProductDetails({ name: '', old_price: '', new_price: '', category: 'women' });
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
          <input value={productDetails.old_price} type="number" name="old_price" onChange={handleInputChange} />
        </div>
        <div className="add-product-item-field">
          <p>Offer Price</p>
          <input value={productDetails.new_price} type="number" name="new_price" onChange={handleInputChange} />
        </div>
      </div>

      <div className="add-product-item-field">
        <p>Category</p>
        <select name="category" value={productDetails.category} onChange={handleInputChange}>
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
            alt="Upload"
          />
        </label>
        <input type="file" id="file-input" hidden onChange={handleImageChange} />
      </div>

      <button onClick={Add_product} className='add-product-button'>Add Product</button>
    </div>
  );
};

export default AddProduct;
*/

import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = ({ backUrl, allProducts, setAllProducts, fetchProducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    old_price: '',
    new_price: '',
    category: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Submit new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("old_price", formData.old_price);
      form.append("new_price", formData.new_price);
      form.append("category", formData.category);
      if (formData.image) form.append("image", formData.image);

      const response = await fetch(`${backUrl}/addproduct`, {
        method: "POST",
        body: form,
      });

      const result = await response.json();
      if (result.success) {
        alert("✅ Product added successfully!");

        // Optimistic update
        setAllProducts([result.product, ...allProducts]);

        // Full refresh from backend
        fetchProducts();

        // Reset form
        setFormData({
          name: '',
          old_price: '',
          new_price: '',
          category: '',
          image: ''
        });
      } else {
        alert("❌ Failed to add product: " + result.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("⚠️ Error adding product. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Product Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="old_price" 
          placeholder="Old Price" 
          value={formData.old_price} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="new_price" 
          placeholder="New Price" 
          value={formData.new_price} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="category" 
          placeholder="Category" 
          value={formData.category} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="file" 
          name="image" 
          accept="image/*" 
          onChange={handleChange} 
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
