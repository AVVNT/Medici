import './dashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddProduct() {
    const [data, setData] = useState({
        name: "",
        sku: "",
        manufacturer: "",
        stock: 0,
        price: 0.0,
        details: "",
        short_description: "",
        long_description: "",
        product_image: "",
        category: ""
    })
    const [categories, setCategories] = useState([])
    const [message, setMessage] = useState("")
    const [headers, setHeaders] = useState({})

    useEffect(() => {
        async function fetchMyAPI() {
          await getCategories()
        }

        setHeaders({
            'Content-Type': 'application/json',
            'x-access-token': sessionStorage.getItem('x-token')
        })
    
        fetchMyAPI()
    }, [])

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function getCategories(){
        let response = await axios.get('http://localhost:3000/api/admin/category/getall')
        setCategories(response.data.data)
    }

    async function addProduct(){
        setMessage("ADDING!!!")
        let response = await axios.post('http://localhost:3000/api/admin/products/add', data, {headers: headers})
        setMessage(response.data.header.message)
    }

    return (
        <div className="container">
            <div className="containerFormSection">
                <h4>Add Products</h4>
                <form className="primary-font form">
                    <div className="col-1">
                        <label>Product Name:</label> <br />
                        <input type="text" name="name" value={data.name} onChange={handleChange}/>
                    </div>
                    <div className="col-2">
                        <label>Manufacturer:</label> <br />
                        <input type="text" name="manufacturer" value={data.manufacturer} onChange={handleChange}/>
                    </div>
                    <div className="col-1">
                        <label>SKU:</label> <br />
                        <input type="text" name="sku" value={data.sku} onChange={handleChange}/>
                    </div>
                    <div className="col-2">
                        <label>Stock Count</label><br />
                        <input type="number" name="stock" value={data.stock} onChange={handleChange}/>
                    </div>
                    <div className="col-1">
                        <label>Regular Price</label><br />
                        <input type="number" name="price" value={data.price} onChange={handleChange}/>
                    </div>
                    <div className="col-2">
                        <label>Details</label><br />
                        <input type="text" name="details" value={data.details} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Short Description:</label> <br />
                        <textarea name="short_description" rows="10" cols="50" value={data.short_description} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Long Description:</label> <br />
                        <textarea name="long_description" rows="10" cols="50" value={data.long_description} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Select Category</label> <br />
                        <select
                            name='category'
                            value={data.category}
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
                        <input type="image" name="product_image" value={data.product_image} onChange={handleChange}/>
                    </div>
                    <div>
                        <button
                            type='button'
                            onClick={async()=>{
                                await addProduct()
                            }} 
                        >
                            ADD PRODUCT
                        </button>
                    </div>
                </form>
                {message === "" ? <></> : <h1>{message}</h1>}
            </div>
            <div className="containerPreviewSection">

            </div>
        </div >
    );
}