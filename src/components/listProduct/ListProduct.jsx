import React,{useEffect, useState} from 'react'
import './ListProduct.css'
import remove_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
  const backUrl='https://ecommerce-backend-producing.up.railway.app'

  const [allproducts,setAllProducts] = useState([]);

 /*  const fetchProducts = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then(response => response.json()
      .then(data => {
        console.log(data);
        setAllProducts(data);
      }))  
  } */

 const fetchProducts = async () => {
  try {
    const response = await fetch(`${backUrl}/all_products`);
    const data = await response.json();
    console.log("Fetched products:", data);
    setAllProducts(data.products); // ✅ Correct: Extract actual array
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
  /* const removeProduct = async (e) => {
    const productId = e.target.dataset.id;
    try {
      const response = await fetch(`http://localhost:4000/deleteproduct/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAllProducts(allproducts.filter(product => parseInt(product.id) !== parseInt(productId)));
      } else {
        console.error("Error removing product:", response.statusText);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  }
 */
  useEffect(() => {
    fetchProducts();
  }, []);


  /* const removeProduct = async (id) => {
    await fetch('http://localhost:4000/deleteproduct',{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id:id })
  })
      await fetchProducts();
  }
   */
  
  const removeProduct = async (productId) => {
  try {
    const response = await fetch(`${backUrl}/deleteproduct/${productId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setAllProducts(allproducts.filter(product => product.id !== parseInt(productId)));
    } else {
      console.error("Error removing product:", response.statusText);
    }
  } catch (error) {
    console.error("Error removing product:", error);
  }
};

  return (
    <div className='list-product'>
      <h1>All product Lists</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproducts-allproducts">
        <hr />
        {allproducts.map(product => {
          return <div key={product.id} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img src={remove_icon} onClick={() => removeProduct(product.id)} alt=" Remove product" className="productlist-remove-icon" />
          </div>
        }
        )}
      </div>
    </div>
  )
}

export default ListProduct
