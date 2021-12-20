import './dashboard.css';
import ListItems from './components/ListItems';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UpdateProduct() {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [message, setMessage] = useState("")
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTdkOGUwYTM2YjM5YmE2MzVjZTI5MzQiLCJpYXQiOjE2Mzk5MjY4OTEsImV4cCI6MTY0MDAxMzI5MX0.kY-joLUoAssNHCAkINf2USZZPtK4TgUvleYpkT_3I7g'
    }

    useEffect(() => {
        async function fetchMyAPI() {
            await getCategories()
        }
        fetchMyAPI()
    }, [])

    // ADD PAGINATION FEATURE
    useEffect(() => {
        async function fetchMyAPI() {
            await getProducts(selectedCategory, 1)
        }

        fetchMyAPI()
    }, [selectedCategory])

    useEffect(() => {
        console.log(selectedProduct)
    }, [selectedProduct])

    function handleChange(e) {
        setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
    }

    async function getCategories() {
        let response = await axios.get('http://localhost:3000/api/admin/category/getall')
        setCategories(response.data.data)
    }

    async function getProducts(category, page) {
        let response = await axios.get(`http://localhost:3000/api/listing/${category}/${page}`)
        setProducts(response.data.body?.data)
    }

    async function updateProduct(category, productId, newData) {
        setMessage("Updating")
        let body = {
            'category': category,
            '_id': productId,
            'new_data': newData
        }
        console.log(body);
        let response = await axios.post('http://localhost:3000/api/admin/products/update', body, { headers: headers })
        setMessage(response.data.header.message)
    }

    return (
        <div className="container">
            <div className="containerFormSection">
                <h4>Update Products</h4>
                <p>Select Category</p>
                <select
                    name='selectedCategory'
                    value={selectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value)
                    }}
                >
                    {categories.map(item => (
                        <option
                            key={item._id}
                            value={item.name}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>
                {products && <ListItems
                    dataArray={products}
                    category={selectedCategory}
                    setItem={setSelectedProduct}
                    buttonText="Edit"
                />}
                {selectedProduct && 
                    <form className="primary-font form">
                        <div className="col-1">
                            <label>Product Name:</label> <br />
                            <input type="text" name="name" value={selectedProduct.name} onChange={handleChange} />
                        </div>
                        <div className="col-2">
                            <label>Manufacturer:</label> <br />
                            <input type="text" name="manufacturer" value={selectedProduct.manufacturer} onChange={handleChange} />
                        </div>
                        <div className="col-1">
                            <label>SKU:</label> <br />
                            <input type="text" name="sku" value={selectedProduct.sku} onChange={handleChange} />
                        </div>
                        <div className="col-2">
                            <label>Stock Count</label><br />
                            <input type="number" name="stock" value={selectedProduct.stock} onChange={handleChange} />
                        </div>
                        <div className="col-1">
                            <label>Regular Price</label><br />
                            <input type="number" name="price" value={selectedProduct.price} onChange={handleChange} />
                        </div>
                        <div className="col-2">
                            <label>Details</label><br />
                            <input type="text" name="details" value={selectedProduct.details} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Short Description:</label> <br />
                            <textarea name="short_description" rows="10" cols="50" value={selectedProduct.short_description} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Long Description:</label> <br />
                            <textarea name="long_description" rows="10" cols="50" value={selectedProduct.long_description} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Select Category</label> <br />
                            <select
                                name='category'
                                value={selectedProduct.category}
                                onChange={handleChange}
                            // defaultValue={categories[0]}
                            >
                                {categories.map(item => (
                                    <option
                                        key={item._id}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Upload Image</label> <br />
                            <input type="image" name="product_image" value={selectedProduct.product_image} onChange={handleChange} />
                        </div>
                        <div>
                            <button
                                type='button'
                                onClick={async () => {
                                    await updateProduct(selectedProduct.category, selectedProduct._id, selectedProduct)
                                }}
                            >
                                UPDATE PRODUCT
                            </button>
                        </div>
                    </form>
                }
                {message === "" ? <></> : <h1>{message}</h1>}
            </div>
            <div className="containerPreviewSection">

            </div>
        </div >
    );
}