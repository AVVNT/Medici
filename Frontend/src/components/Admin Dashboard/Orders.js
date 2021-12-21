import './dashboard.css';
import ListOrders from './components/ListOrders';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Orders() {
    const [orders, setOrders] = useState(null)
    const [message, setMessage] = useState("")
    const [headers, setHeaders] = useState({})

    useEffect(() => {
        console.log("CALLde")
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
        let response = await axios.get('http://localhost:3000/api/admin/orders/getall', {headers: headers})
        console.log(response.data)
        console.log(headers)
        setOrders(response.data.data)
    }

    return (
        <div className="container">
            <div className="containerFormSection">
                <h4>Orders</h4>
                {/* <p>Select Category</p>
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
                </select> */}
                {orders == null ? <p>LOADING</p>
                :
                <ListOrders 
                    dataArray={orders}
                />}
                {message === "" ? <></> : <h1>{message}</h1>}
            </div>
            <div className="containerPreviewSection">

            </div>
        </div >
    );
}