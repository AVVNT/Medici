import './dashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddPrescription() {
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
    // const [headers, setHeaders] = useState({})
    let headers = {}

    useEffect(() => {
        async function fetchMyAPI() {
          await getCategories()
        }

        headers = {
            'Content-Type': 'application/json',
            'x-access-token': sessionStorage.getItem('x-token')
        }
    
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
                <h4>Add Prescription</h4>
                <form className="primary-font form">
                    <div className="col-1">
                        <label>Title:</label> <br />
                        <input type="text" name="name" value={data.name} onChange={handleChange}/>
                    </div>
                    <div className="col-1">
                        <label>Repeat:</label> <br />
                        <select
                            name='category'
                            value={data.category}
                            onChange={handleChange}
                            // defaultValue={categories[0]}
                        >
                            <option>bi-weekly</option>
                            <option>weekly</option>
                            <option>monthly</option>
                        </select>
                    </div>
                    
                    <div>Order</div>
                    <div>
                        <p>order 1</p> <br />
                        <label>Name</label>
                        <input type='text' name="long_description" value={data.long_description} onChange={handleChange}/>
                        <br /><label>Select Category</label> <br />
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
                        </select><br />
                        <label>Qty</label>
                        <input type='number' name="long_description" value={data.long_description} onChange={handleChange}/>

                    </div>
                    <div>
                        <p>order 2</p> <br />
                        <label>Name</label>
                        <input type='text' name="long_description" value={data.long_description} onChange={handleChange}/>
                        <br /><label>Select Category</label> <br />
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
                        </select><br />
                        <label>Qty</label>
                        <input type='number' name="long_description" value={data.long_description} onChange={handleChange}/>

                    </div>
                    <div>
                        <p>order 3</p> <br />
                        <label>Name</label>
                        <input type='text' name="long_description" value={data.long_description} onChange={handleChange}/>
                        <br /><label>Select Category</label> <br />
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
                        </select><br />
                        <label>Qty</label>
                        <input type='number' name="long_description" value={data.long_description} onChange={handleChange}/>

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