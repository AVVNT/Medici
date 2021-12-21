import './dashboard.css';
import ListItems from './components/ListItems';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Orders() {
    const [orders, setOrders] = useState([])
    const [message, setMessage] = useState("")
    const [headers, setHeaders] = useState({})

    useEffect(() => {
        async function fetchMyAPI() {
            await getOrders()
        }

        setHeaders({
            'Content-Type': 'application/json',
            'x-access-token': sessionStorage.getItem('x-token')
        })

        fetchMyAPI()
    }, [])

    async function getOrders(){
        let response = await axios.get('http://localhost:3000/api/admin/orders/getall')
        setCategories(response.data.data)
    }

    async function getProducts(category, page){
        let response = await axios.get(`http://localhost:3000/api/listing/${category}/${page}`)
        setOrders(response.data.body?.data)
    }

    async function removeProduct(category, productId){
        setMessage("Removing")
        let body = {
            'category' : category,
            '_id' : productId
        }
        console.log(body);
        let response = await axios.post('http://localhost:3000/api/admin/products/remove', body, {headers: headers})
        setMessage(response.data.header.message)
    }

    return (
        <div className="container">
            <div className="containerFormSection">
                <h4>Remove Products</h4>
                <p>Select Category</p>
                <select
                    name='selectedCategory'
                    value={selectedCategory}
                    onChange={(e)=>{
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
                {orders && <ListItems
                    dataArray={orders}
                    category={selectedCategory}
                    buttonFunction={removeProduct}
                    buttonText="Remove"
                    setItem={setSelectedProduct}
                />}
                {message === "" ? <></> : <h1>{message}</h1>}
            </div>
            <div className="containerPreviewSection">

            </div>
        </div >
    );
}